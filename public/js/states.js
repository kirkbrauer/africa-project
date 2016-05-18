app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/people');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('people', {
            url: '/people',
            templateUrl: '/public/templates/people.html'
        })

        .state('sources', {
            url: '/sources',
            templateUrl: '/public/templates/sources.html'
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

        .state('aidsandhiv', {
            url: '/aidsandhiv',
            tabs: [
              {name: "Connection", state: "aidsandhiv.connection"},
              {name: "Effects", state: "aidsandhiv.effects"}
            ],
            controller: "TabCtrl",
            templateUrl: '/public/templates/aidsandhiv.html'
        })

        .state('aidsandhiv.connection', {
            keeptabs: true,
            url: '/connection',
            tabs: [
              {name: "Connection", state: "aidsandhiv.connection"},
              {name: "Effects", state: "aidsandhiv.effects"}
            ],
            name: "Aids and HIV Connection",
            controller: "TabCtrl",
            templateUrl: '/public/templates/aidsandhiv.connection.html'
        })

        .state('aidsandhiv.effects', {
            keeptabs: true,
            url: '/effects',
            name: "Effects",
            controller: "TabCtrl",
            templateUrl: '/public/templates/aidsandhiv.effects.html'
        })

        .state('panafricanism', {
            url: '/panafricanism',
            templateUrl: '/public/templates/panafricanism.html'
        })

        .state('politics', {
            url: '/politics',
            tabs: [
              {name: "U.S. Relations", state: "politics.usrelations"},
              {name: "Soviet Relations", state: "politics.sovietrelations"},
              {name: "Rivalry", state: "politics.rivalry"},
              {name: "Joseph Mobutu", state: "politics.coloneljoseph"}
            ],
            controller: "TabCtrl",
            templateUrl: '/public/templates/politics.html'
        })

        .state('politics.sovietrelations', {
            keeptabs: true,
            name: 'Soviet Relations',
            url: '/sovietrelations',
            templateUrl: '/public/templates/sovietrelations.html'
        })

        .state('politics.rivalry', {
            keeptabs: true,
            name: "Rivalry",
            url: '/rivalry',
            templateUrl: '/public/templates/rivalry.html'
        })

        .state('politics.coloneljoseph', {
            keeptabs: true,
            name: "Colonel Joseph",
            url: '/coloneljoseph',
            templateUrl: '/public/templates/coloneljoseph.html'
        })

        .state('politics.usrelations', {
            keeptabs: true,
            tabs: [
              {name: "U.S. Relations", state: "politics.usrelations"},
              {name: "Soviet Relations", state: "politics.sovietrelations"},
              {name: "Rivalry", state: "politics.rivalry"},
              {name: "Joseph Mobutu", state: "politics.coloneljoseph"}
            ],
            name: "US Relations",
            url: '/usrelations',
            templateUrl: '/public/templates/usrelations.html'
        })

        .state('revolutioninafrica', {
            name: "Revolution In Africa",
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

        .state('revolution', {
            url: '/revolution',
            tabs: [
              {name: "Angola", state: "revolution.angola"},
              {name: "Rhodesia", state: "revolution.rhodesia"},
              {name: "Gold Coast", state: "revolution.gold-coast"},
            ],
            controller: "TabCtrl",
            templateUrl: '/public/templates/revolutioninafrica.html'
        })

        .state('revolution.angola', {
            keeptabs: true,
            tabs: [
              {name: "Angola", state: "revolution.angola"},
              {name: "Rhodesia", state: "revolution.rhodesia"},
              {name: "Gold Coast", state: "revolution.gold-coast"},
            ],
            name: "Angola",
            url: '/angola',
            templateUrl: '/public/templates/revolution.angola.html'
        })

        .state('revolution.rhodesia', {
            keeptabs: true,
            name: "Rhodesia",
            url: '/rhodesia',
            templateUrl: '/public/templates/revolution.rhodesia.html'
        })

        .state('revolution.gold-coast', {
            keeptabs: true,
            name: "Gold Coast",
            url: '/gold-coast',
            templateUrl: '/public/templates/revolution.gold-coast.html'
        })

        .state('violence', {
            url: '/violence',
            tabs: [
              {name: "Intro", state: "violence.intro"},
              {name: "Nigeria", state: "violence.nigeria"},
              {name: "Apartheid", state: "violence.apartheid"},
              {name: "Nelson Mandela", state: "violence.mandela"},
            ],
            controller: "TabCtrl",
            templateUrl: '/public/templates/violence.html'
        })

        .state('violence.intro', {
            keeptabs: true,
            tabs: [
              {name: "Intro", state: "violence.intro"},
              {name: "Nigeria", state: "violence.nigeria"},
              {name: "Apartheid", state: "violence.apartheid"},
              {name: "Nelson Mandela", state: "violence.mandela"},
            ],
            name: "Intro",
            url: '/intro',
            templateUrl: '/public/templates/violence.intro.html'
        })

        .state('violence.nigeria', {
            keeptabs: true,
            name: "Nigeria",
            url: '/nigeria',
            templateUrl: '/public/templates/violence.nigeria.html'
        })

        .state('violence.mandela', {
            keeptabs: true,
            name: "Nelson Mandela",
            url: '/mandela',
            templateUrl: '/public/templates/violence.mandela.html'
        })

        .state('violence.apartheid', {
            keeptabs: true,
            name: "Apartheid",
            url: '/apartheid',
            templateUrl: '/public/templates/violence.apartheid.html'
        })

})
