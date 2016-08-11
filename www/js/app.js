var db = null;

angular.module('appNameToSet', [

  'ionic',
  'ngCordova',
  
  'starter.controllers',
  'appNameToSet.homeCtrl',

  'appNameToSet.databaseSrv',
  'appNameToSet.utilsSrv'
])


  .run(function($ionicPlatform, databaseSrv) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      databaseSrv.initDatabase()
        .then(
          function (success) {
            console.log("Success DB");
          }
        )

    });
  })

  .constant("DatabaseParams",{

    "DatabaseName"      : "app.db",

    "SystemTable":"system",
      "SYS_ID":"_id",
      "SYS_LAST_SYS_UPDATE":"last_sys_update",

    "FileTable" : "file",
      "FILE_ID":"id",
      "FILE_BLOB_DATA":"data",
      "FILE_FILE_NAME":"file_name"

  })




    .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
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

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
