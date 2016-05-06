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

        .state('decolonization', {
            url: '/decolonization',
            templateUrl: '/public/templates/decolonization.html'
        })

        .state('desertification', {
            url: '/desertification',
            templateUrl: '/public/templates/desertification.html'
        })

        .state('africaseconomy', {
            url: '/africaseconomy',
            templateUrl: '/public/templates/africaseconomy.html'
        })

        .state('violence', {
            url: '/violence',
            templateUrl: '/public/templates/violence.html'
        })

        .state('panafricanism', {
            url: '/panafricanism',
            templateUrl: '/public/templates/panafricanism.html'
        })

        .state('politics', {
            url: '/politics',
            templateUrl: '/public/templates/politics.html'
        })

        .state('politics.sovietrelations', {
            url: '/sovietrelations',
            templateUrl: '/public/templates/sovietrelations.html'
        })

        .state('politics.rivalry', {
            url: '/rivalry',
            templateUrl: '/public/templates/rivalry.html'
        })

        .state('politics.coloneljoseph', {
            url: '/coloneljoseph',
            templateUrl: '/public/templates/coloneljoseph.html'
        })

        .state('politics.usrelations', {
            url: '/usrelations',
            templateUrl: '/public/templates/politics.html'
        })

        .state('revolutioninafrica', {
            url: '/revolutioninafrican Africa',
            templateUrl: '/public/templates/revolutioninafrica.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/public/templates/login.html'
        })

        .state('controlpanel', {
            url: '/ctrlpanel',
            requiresauth: true,
            templateUrl: '/public/templates/controlpanel.html',
            controller: "SimCtrl"
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
