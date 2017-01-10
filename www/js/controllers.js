angular.module('App.controllers', [])

.controller('DashCtrl', function($scope,$http) {
  $scope.apiURL  = 'http://api.mymobiledesigner.com/mls/v1/getRoutes';
  $scope.routes =[];

  $http.get($scope.apiURL)
      .success(function(data,status){
        $scope.routes = data;
      })
      .error(function(data, status, headers,config){
        console.log('data error');
      })
      .then(function(result){
        //things = result.data;
      });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
