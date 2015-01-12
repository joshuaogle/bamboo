angular.module('bamboo.controllers', [])

.controller('FeedsController', function($scope, Feeds) {
  $scope.feeds = Feeds.all();
  $scope.remove = function(feed) {
    Feeds.remove(feed);
  }
})

.controller('ItemController', function($scope, $stateParams, Feeds) {
  $scope.chat = Feeds.get($stateParams.itemId);
})

.controller('StacksController', function($scope, $stateParams, Feeds) {
  $scope.stack = Stacks.get($stateParams.itemId);
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
});
