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

function stringGen(len) {
    var text = "";

    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
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
        io.to(group).emit('userremoved', { users: users(group) });
      }
    }
  });
  socket.on('join_group', function (data) {
    if (debug) console.log(data.clientid);
    //console.log(stringGen(6));
    if (!groups[data.groupid]) {
      groups[data.groupid] = {};
    } else {
      io.to(data.groupid).emit('useradded', { name: data.name });
    }
    groups[data.groupid][data.clientid] = { id: data.clientid, alive: true, role: undefined, name: data.name };
    socket.join(data.groupid);
    socket.emit('group_joined', { role: "NaN", users: users(data.groupid) });
  });
});
