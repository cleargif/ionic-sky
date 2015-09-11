// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('IonSky', ['ionic', 'IonSky.controllers', 'IonSky.services', 'underscore'])
  .constant('ApiEndpoint', {
    url: 'https://ionskyapi.herokuapp.com/feeds/mobile/'
    //url: 'http://feeds.skynews.com'
    // url: 'http://localhost:5000/feeds/mobile/'
  })

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    resolve: {
      appinit: function ($q, DataService) {
        console.log('app resolve');
        return $q.all([
          DataService.getDefault()
        ]);
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })


  .state('app.cat', {
    url: '/category/:cat',
    resolve: {
      init: function (appinit, $q, DataService, $stateParams) {
        return $q.all([
          DataService.getData({
            route: $stateParams.cat
          })
        ]);
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});