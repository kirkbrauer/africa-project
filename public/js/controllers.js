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

.controller("NavCtrl", function ($scope, $state, $rootScope) {
  $scope.buttons = [
    {name: "African People", page: "people"},
    {name: "Africa's Colonization", page: "colonization"},
    {name: "Decolonization in Africa", page: "decolonization"},
    {name: "What is Desertification", page: "desertification"},
    {name: "Africa's Economy", page: "africaseconomy"},
    {name: "AIDS and HIV in Africa", page: "aidsandhiv.connection"},
    {name: "Pan-  Africanism", page: "panafricanism"},
    {name: "Violence in Africa", page: "violence.intro"},
    {name: "Cold War Politics", page: "politics.usrelations"},
    {name: "Revolution in Africa", page: "revolution.angola"}
  ];
  $scope.simstatus = "Start Simulation";
  $scope.simstat = false;
  $scope.openpage = function ($index) {
    $state.go($scope.buttons[$index].page)
  };
  $rootScope.$on("hidenav", function () {
    $scope.simstat = true;
  });
  $rootScope.$on("shownav", function () {
    $scope.simstat = false;
  });
  $scope.togglesim = function () {
    if ($scope.simstatus === "Start Simulation") {
      $scope.simstatus = "Stop Simulation";
      $rootScope.$broadcast("hidenav");
      $state.go('simulation.background');
    } else {
      $scope.simstatus = "Start Simulation";
      $rootScope.$broadcast("shownav");
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
})
.controller("TabCtrl", function ($scope, $state, $rootScope) {
  $scope.tabs = $state.current.tabs;
  $scope.opentab = function ($index) {
    $state.go($scope.tabs[$index].state);
  };
  $rootScope.$on('$stateChangeStart',
  function(event, toState, toParams, fromState, fromParams, options){
    if (!toState.keeptabs) {
      $scope.tabs = toState.tabs;
    }
  });
});
