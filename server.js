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
  socket.on('startsim', function () {
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
    if (groupnum === groupok) {
      if (debug) console.log("Simulation Started");
      if (debug) console.log("Tutsis "+tutsis);
      if (debug) console.log("Hutus "+hutus);
      socket.broadcast.emit('startsim');
      questionnum = 0;
    } else {
      socket.emit('notready');
    }
  });
  var waiting = { type:"Waiting", id:-1, question: "Waiting for response...", answers:[] };
  var hutuquestions = [
    { type: "First", id:0, question: "Your people have deemed the Tutsis the cause of all problems in Rwanda. How would you like to exterminate them?", answers: ["Hire militas to storm peoples houses and murder them","Have militias set up roadblocks and kill them with machetes"] },
    { type: "First", id:1, question: "Second Question!", answers: ["Hire militas to storm peoples houses and murder them","Have militias set up roadblocks and kill them with machetes"] }
  ];
  var tutsiquestions = [
    { type:"First", id:0, question: "Test Question", answers: ["Test Answer"] }
  ];
  function emitto (role, data) {
    for (var group in groupkey) {
      if (groupkey[group].role === role) {
        io.to(group).emit('question', data);
      }
    }
  }
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
  socket.on('submit', function (data) {
    if (data.role === "Hutu") {
      if (debug) console.log(data.response.answer);
      votes++;
      if (debug) console.log("Hutu Voted");
      if (votes === hutus) {
        emitto("Hutu", hutuquestions[1]);
        if (debug) console.log("Hutus finished voting");
        emitto("Tutsi", tutsiquestions[0]);
      }
    } else {

    }
  })
});
