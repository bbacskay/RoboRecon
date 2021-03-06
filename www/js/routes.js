angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('menu.pitScouting', {
    url: '/pitscouting',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pitScouting.html',
        controller: 'pitScoutingCtrl'
      }
    }
  })

  .state('menu.matchScouting', {
    url: '/matchscouting',
    views: {
      'side-menu21': {
        templateUrl: 'templates/matchScouting.html',
        controller: 'matchScoutingCtrl'
      }
    }
  })

  .state('menu.synchronize', {
    url: '/Synchronize ',
    views: {
      'side-menu21': {
        templateUrl: 'templates/synchronize.html',
        controller: 'synchronizeCtrl'
      }
    }
  })

  .state('menu.teamManager', {
    url: '/teamManager ',
    views: {
      'side-menu21': {
        templateUrl: 'templates/teamManager.html',
        controller: 'teamManagerCtrl'
      }
    }
  })
  
  .state('menu.scoutManager', {
    url: '/scoutManager',
    views: {
      'side-menu21': {
        templateUrl: 'templates/scoutManager.html',
        controller: 'scoutManagerCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/matchscouting')

  

});