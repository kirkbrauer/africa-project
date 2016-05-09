app.controller("AppCtrl", function ($scope, $rootScope, $state) {
  $rootScope.authenticated = false;
  $scope.password = "";
  $scope.login = function (password) {
    console.log(password);
    if (password === "AfricaRocks!") {
      $rootScope.authenticated = true;
      $state.go('controlpanel');
    }
  }
  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams, options){
    if (toState.requiresauth && !$rootScope.authenticated) {
      event.preventDefault();
      $state.go('login');
    }
  });
})

.controller("NavCtrl", function ($scope, $state) {
  $scope.buttons = [
    {name: "African People", page: "people"},
    {name: "Africa's Colonization", page: "colonization"},
    {name: "Decolonization in Africa", page: "decolonization"},
    {name: "What is Desertification", page: "desertification"},
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
      $scope.alive = true;
      $scope.role;
      $scope.groupid;
      $scope.groupmembers = [];
      $scope.user = {
        group: "",
        name: ""
      };
      if (socket) {
        socket.disconnect();
      }
      if (conn_check) {
        clearInterval(conn_check);
      }
      $state.go('people');
    }
  };
});
