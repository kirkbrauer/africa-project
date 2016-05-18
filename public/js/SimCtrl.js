app.controller("SimCtrl", function ($scope, $state) {
  socket = io('https://africa-project.herokuapp.com');
  //socket = io('http://localhost:8080');
  socket.on('connect', function () {
    console.log("Connected to server");
    sessionid = socket.io.engine.id;
    console.log(sessionid);
    conn_check = setInterval( function() {
      socket.emit('conn_check', { data: 'test' });
    }, 1000);
  });
  socket.on('conn_check', function (data) {});
  socket.on('connect_error', function () {
    //alert("Error connecting to the server");
  });
  $scope.alive = true;
  $scope.role;
  $scope.groupid;
  $scope.question = "";
  $scope.options = [];
  $scope.groupmembers = [];
  $scope.timercount = 30;
  $scope.show_timer = false;
  $scope.entername = false;
  $scope.deadmessage = "";
  $scope.user = {
    group: "",
    name: ""
  };
  $scope.shownext = true;
  $scope.next = function () {
    if ($state.current.nextstate === 'simulation.intro') {
      $scope.shownext = false;
    }
    $state.go($state.current.nextstate);
  };
  $scope.enternamebtn = function () {
    $scope.entername = true;
    $("#name-input").focus();
  };
  $scope.startsim = function (user) {
    console.log(user.group);
    $scope.show_timer = true;
    if (!user.group) {
      alert("You must enter a group number")
    } else {
      socket.emit('join_group', { clientid: sessionid, groupid: user.group, name: user.name });
    }
  };
  socket.on('group_joined', function (data) {
    if (data.error) {
      alert(data.error);
    } else {
      console.log("Joined Group");
      $scope.groupid = data.groupid;
      $scope.groupmembers = data.users;
      $state.go('simulation.waiting');
    }
  });
  socket.on('useradded', function (data) {
    console.log(data.name);
    $scope.groupmembers.push(data.name);
    $scope.$apply();
  });
  socket.on('userremoved', function (data) {
    $scope.groupmembers =  data.users;
    $scope.$apply();
  });
  $scope.ready = function (groupid) {
    console.log(groupid);
    socket.emit('ready', { groupid: groupid });
  };
  socket.on('ready', function (data) {
    console.log(data.role);
    $scope.role = data.role;
    if (data.role === "Hutu") {
      $state.go('simulation.hutu');
    } else {
      $state.go('simulation.tutsi');
    }
  });
  socket.on('startsim', function () {
    console.log("Simulation Started");
    $scope.question = {};
    if ($state.current.name != "controlpanel") {
      $state.go('simulation.option');
    }
  });
  socket.on('question', function (question) {
    console.log(question);
    $scope.question = question;
    $scope.options = question.answers;
    $scope.$apply();
  });
  socket.on('waiting', function (message) {
    console.log("Waiting");
    $scope.question.question = message;
    $scope.options = [];
    $scope.$apply();
  });
  socket.on('update_timer', function (time) {
    $scope.timercount = time;
    $scope.$apply();
  });
  socket.on('Dead', function (message) {
    console.log("Died");
    $state.go("simulation.dead");
    $scope.deadmessage = message;
    $scope.$apply();
  });
  socket.on('Survived', function (message) {
    console.log("Survived");
    console.log(message);
    $scope.question.question = message;
    $scope.options = [];
    $scope.$apply();
  });
  socket.on('end_sim', function () {
    console.log("End Simulation");
    $state.go('simulation.end');
  });
  $scope.select = function ($index) {
    console.log($index);
    socket.emit('submit', { role: $scope.role, groupid: $scope.groupid, response: { questionid: $scope.question.id, answer: $index } });
    if ($scope.role === "Hutu") {
      $scope.question.question = "Waiting for response...";
      $scope.options = [];
    }
  };
  //Code for Control Panel page
  $scope.ctrlp = {};
  $scope.ctrlp.startsim = function () {
    socket.emit('startsim');
  };
  socket.on('notready', function () {
    console.log("Not Ready");
    alert("Not all groups are ready to start!");
  });
})
