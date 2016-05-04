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

var groups = {};
var groupkey = {};

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
      groups[data.groupid][data.clientid] = { id: data.clientid, alive: true, name: data.name };
      socket.join(data.groupid);
      socket.emit('group_joined', { users: users(data.groupid), groupid: data.groupid });
    }
  });
  socket.on('ready', function (data) {
    if (debug) console.log(data.groupid + " Ready");
    if (groupkey[data.groupid].ready === false) {
      groupkey[data.groupid].ready = true;
      io.to(data.groupid).emit('ready', { role: chooseSide() });
    }
  });
});
