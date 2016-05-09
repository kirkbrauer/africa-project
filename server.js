var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8080;
var debug = process.env.DEBUG || true;

app.use('/public', express.static(__dirname + '/public'));

app.use('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(port);
if (debug) console.log("Listening on " + port);

//Define System Variables
var groups = {};
var groupkey = {};
var questionnum = 0;
var groupok = 0;
var tutsis = 0;
var hutus = 0;
var votes = 0;
var votetimer;
var votedata = [];
var timercount = 30;
var currentquestion = {};

function stringGen(len) {
    var text = "";

    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
}

function chooseSide() {
    return (Math.floor(Math.random() * 2) == 0) ? 'Tutsi' : 'Hutu';
}

function users (groupid) {
  var arr = [];
  for(var index in groups[groupid]) {
    arr.push(groups[groupid][index].name);
  }
  return arr;
}

io.on('connection', function (socket) {
  if (debug) console.log("Client Connected");
  socket.on('conn_check', function () {
    socket.emit('conn_check', { data: 'test' });
  });
  socket.emit('news', { hello: 'world' });
  socket.on('disconnect', function () {
    if (debug) console.log("Client Disconnected");
    if (debug) console.log(socket.id.substring(2));
    for (var group in groups) {
      if (groups[group][socket.id.substring(2)]) {
        delete groups[group][socket.id.substring(2)];
        if (users(group).length === 0) {
          delete groups[group];
          delete groupkey[group];
        } else {
          io.to(group).emit('userremoved', { users: users(group) });
        }
      }
    }
  });
  socket.on('join_group', function (data) {
    if (debug) console.log(data.clientid);
    //console.log(stringGen(6));
    if (!groups[data.groupid]) {
      groups[data.groupid] = {};
      groupkey[data.groupid] = { ready: false, role: "None" };
    } else {
      if (!groupkey[data.groupid].ready) {
        io.to(data.groupid).emit('useradded', { name: data.name });
      }
    }
    if (groupkey[data.groupid].ready) {
      socket.emit('group_joined', { error: "You cannot join while the simulation is running!" });
    } else {
      groups[data.groupid][data.clientid] = { id: data.clientid, alive: true, name: data.name, round: 0 };
      socket.join(data.groupid);
      socket.emit('group_joined', { users: users(data.groupid), groupid: data.groupid });
    }
  });
  socket.on('ready', function (data) {
    if (debug) console.log(data.groupid + " Ready");
    if (groupkey[data.groupid].ready === false) {
      groupkey[data.groupid].ready = true;
      if (!data.groupid.includes(":Tutsi") && !data.groupid.includes(":Hutu")) {
        var role = chooseSide();
      } else {
        if (data.groupid.includes(":Tutsi")) {
          var role = "Tutsi"
        } else if (data.groupid.includes(":Hutu")) {
          var role = "Hutu";
        }
      }
      groupkey[data.groupid].role = role;
      io.to(data.groupid).emit('ready', { role: role });
    }
  });
  function emitto (role, message, data) {
    //Set the current question
    if (role === "Hutu" && message === "question") {
      currentquestion["Hutu"] = data;
    }
    for (var group in groupkey) {
      if (groupkey[group].role === role) {
        io.to(group).emit(message, data);
      }
    }
  }
  function getgroupnumbers () {
    groupnum = 0;
    groupok = 0;
    tutsis = 0;
    hutus = 0;
    for (var group in groupkey) {
      groupnum++;
      if (groupkey[group].ready) {
        var usercount = 0;
        for (var user in groups[group]) {
          usercount++;
        }
        if (groupkey[group].role === "Hutu") {
          hutus+=usercount;
        } else {
          tutsis+=usercount;
        }
        groupok++;
      }
    }
  }
  var waiting = { type:"Waiting", id:-1, question: "Waiting for response...", answers:[] };
  socket.on('startsim', function () {
    getgroupnumbers();
    if (groupnum === groupok && tutsis != 0 && hutus != 0) {
      if (debug) console.log("Simulation Started");
      if (debug) console.log("Tutsis "+tutsis);
      if (debug) console.log("Hutus "+hutus);
      socket.broadcast.emit('startsim');
      emitto("Hutu", "question", hutuquestions[0]);
      emitto("Tutsi", "question", waiting);
      questionnum = 0;
    } else {
      socket.emit('notready');
    }
  });
  var hutuquestions = [
    { type: "First", id:0, question: "Your people have deemed the Tutsis the cause of all problems in Rwanda. How would you like to exterminate them?", answers: [{answer: "Hire militas to storm peoples houses and murder them", send: 0}, {answer: "Have militias set up roadblocks and kill them with machetes", send: 1}] },
    { type: "First", id:1, question: "Second Question!", answers: ["Hire militas to storm peoples houses and murder them","Have militias set up roadblocks and kill them with machetes"] }
  ];
  var tutsiquestions = [
    { type:"First", id:0, question: "Test Question", answers: [{answer: "Test Answer"}] },
    { type:"First", id:1, question: "Test Question 2", answers: [{answer: "Test 2 Answer"}] }
  ];
  socket.on('generate_question', function (data) {
    if (debug) console.log("Generating Question");
    if (questionnum === 0) {
      if (data.role == "Hutu") {
        socket.emit('question', hutuquestions[0]);
      } else {
        socket.emit('waiting', "Waiting for Hutu Response...");
      }
    }
  });
  function closevoting() {
    clearInterval(votetimer);
    console.log(currentquestion["Hutu"].answers[votedata.indexOf(Math.max.apply( Math, votedata ))]);
    currentquestion = {};
    timercount = "Next";
    emitto("Hutu", "update_timer", "Next");
    votes = 0;
    emitto("Hutu", "question", hutuquestions[1]);
    if (debug) console.log("Hutus finished voting");
    emitto("Tutsi", "question", tutsiquestions[0]);
  }
  socket.on('submit', function (data) {
    if (data.role === "Hutu") {
      if (debug) console.log("Hutu Voted");
      if (votes === 0) {
        votedata = [];
        timercount = 30;
        if (debug) console.log("Activated Timer");
        votetimer = setInterval(function () {
          timercount--;
          emitto("Hutu", "update_timer", timercount);
          if (timercount === 0) {
            //Close voting if time Expires
            closevoting();
            //Recalculate group member numbers
            getgroupnumbers();
          }
        }, 1000);
      }
      votes++;
      if (!votedata[data.response.answer]) {
        currentquestion["Hutu"].answers.forEach(function (value, index) {
          votedata[index] = 0;
        });
      }
      votedata[data.response.answer]++;
      if (votes === hutus) {
        closevoting();
      }
    } else {

    }
  })
});
