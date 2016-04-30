app = angular.module('africa-project', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })

})

.controller("AppCtrl", function ($scope) {

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
  $scope.openpage = function () {
    console.log("Called");
  };
});
