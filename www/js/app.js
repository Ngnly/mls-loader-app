'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase', 'pascalprecht.translate','ngMessages','App.controllers','App.services'])
    .filter("to_trusted", ["$sce", function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])

    .filter("trustUrl", function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    })

    .filter("strExplode", function() {
        return function($string,$delimiter) {
            if(!$string.length ) return;
            var $_delimiter = $delimiter || "|";
            return $string.split($_delimiter);
        };
    })

    .filter("strDate", function(){
        return function (input) {
            return new Date(input);
        }
    })
    .filter("strHTML", ["$sce", function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }])



    .config(function($stateProvider, $urlRouterProvider, $translateProvider, $translateStaticFilesLoaderProvider) {



  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider.fallbackLanguage("en");

  $translateProvider.useStaticFilesLoader({
          prefix: 'langs/lang-',
          suffix: '.json'
        });

$stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.routes', {
        url: '/routes',
        views: {
            'tab-dash': {
                templateUrl: 'views/routes/route.html',
                controller: 'DashCtrl'
            }
        }
    })
    .state('tab.route-detail', {
        url: '/routes/:route',
        views: {
            'tab-dash': {
                templateUrl: 'views/routes/route-detail.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-chats': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    })
    ;
$urlRouterProvider.otherwise("/login");
})
// Changue this for your Firebase App URL.
.constant('FURL', {
    apiKey: "AIzaSyCSZTH17LsqOyPxXCp7ChdRsWMVbKtznMg",
    authDomain: "mls-driver.firebaseapp.com",
    databaseURL: "https://mls-driver.firebaseio.com",
    storageBucket: "mls-driver.appspot.com",
    messagingSenderId: "580826047222"
}
  )
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(FURL) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
