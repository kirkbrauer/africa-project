app = angular.module('africa-project', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/people');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('people', {
            url: '/people',
            templateUrl: '/public/templates/people.html'
        })

        .state('colonization', {
            url: '/colonization',
            templateUrl: '/public/templates/colonization.html'
        })

        .state('simulation', {
            url: '/sim',
            templateUrl: '/public/templates/sim.html',
            controller: "SimCtrl"
        })

        .state('simulation.background', {
          name: 'background',
          url: '/sim-background',
          nextstate: 'simulation.intro',
          templateUrl: '/public/templates/sim.background.html'
        })

        .state('simulation.intro', {
          name: 'intro',
          url: '/sim-intro',
          templateUrl: '/public/templates/sim.intro.html'
        })

        .state('simulation.waiting', {
          name: 'waiting',
          url: '/sim-wait',
          templateUrl: '/public/templates/sim.waiting.html'
        })

        .state('simulation.hutu', {
          name: 'hutu',
          url: '/sim-hutu',
          templateUrl: '/public/templates/sim.hutu.html'
        })

        .state('simulation.tutsi', {
          name: 'tutsi',
          url: '/sim-tutsi',
          templateUrl: '/public/templates/sim.tutsi.html'
        })

        .state('simulation.option', {
          name: 'option',
          url: '/sim-option',
          templateUrl: '/public/templates/sim.option.html'
        })

        .state('simulation.dead', {
          name: 'dead',
          url: '/sim-dead',
          templateUrl: '/public/templates/sim.dead.html'
        })

        .state('simulation.end', {
          name: 'end',
          url: '/sim-end',
          templateUrl: '/public/templates/sim.end.html'
        })

})

.controller("AppCtrl", function ($scope) {

})

.controller("SimCtrl", function ($scope, $state) {
  var socket = io('https://africa-project.herokuapp.com');
  //var socket = io('http://localhost:8080');
  socket.on('connect', function () {
    console.log("Connected to server");
    sessionid = socket.io.engine.id;
    console.log(sessionid);
    setInterval( function() {
      socket.emit('conn_check', { data: 'test' });
    }, 1000);
    socket.on('conn_check', function (data) {
      console.log("Checked");
    });
  });
  socket.on('connect_error', function () {
    alert("Error connecting to the server");
  });
  $scope.alive = true;
  $scope.role;
  $scope.groupid;
  $scope.groupmembers = ["Test User"];
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
  $scope.startsim = function (user) {
    console.log(user.group);
    if (!user.group) {
      alert("You must enter a group number")
    } else {
      socket.emit('join_group', { clientid: sessionid, groupid: user.group, name: user.name });
      socket.on('group_joined', function (data) {
        console.log("Joined Group");
        $scope.groupid = data.groupid;
        $scope.groupmembers = data.users;
        $state.go('simulation.waiting');
        socket.on('useradded', function (data) {
          console.log(data.name);
          $scope.groupmembers.push(data.name);
          $scope.$apply();
        });
        socket.on('userremoved', function (data) {
          $scope.groupmembers =  data.users;
          $scope.$apply();
        });
      });
    }
  };
  $scope.ready = function (groupid) {
    console.log(groupid);
    socket.emit('ready', { groupid: groupid });
  };
  socket.on('ready', function (data) {
    console.log(data.role);
    if (data.role === "Hutu") {
      $state.go('simulation.hutu');
    } else {
      $state.go('simulation.tutsi');
    }
  });
})

.controller("NavCtrl", function ($scope, $state) {
  $scope.buttons = [
    {name: "African People", page: "people"},
    {name: "Africa's Colonization", page: "colonization"},
    {name: "Decolonization in Africa", page: "decolonization"},
    {name: "Africa's Economy", page: "africaseconomy"},
    {name: "Pan-  Africanism", page: "panafricanism"},
    {name: "Violence in Africa", page: "violence"},
    {name: "Cold War Politics", page: "politics"},
    {name: "Revolution in Africa", page: "revolution"}
  ];
  $scope.simstatus = "Start Simulation";
  $scope.openpage = function ($index) {
    $state.go($scope.buttons[$index].page)
  };
  $scope.togglesim = function () {
    if ($scope.simstatus === "Start Simulation") {
      $scope.simstatus = "Stop Simulation";
      $state.go('simulation.background');
    } else {
      $scope.simstatus = "Start Simulation";
      $state.go('people');
    }
  };
});
