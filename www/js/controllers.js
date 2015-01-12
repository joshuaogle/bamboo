angular.module('bamboo.controllers', [])

.controller('StacksController', function($scope, $stateParams, Stacks) {
  $scope.stack = Stacks.get($stateParams.itemId);
})

.controller('FeedsController', function($scope, Feeds) {
  $scope.feeds = Feeds.all();
  $scope.remove = function(feed) {
    Feeds.remove(feed);
  }
})

.controller('ItemController', function($scope, $stateParams, Items) {
  $scope.feed = Feeds.get($stateParams.itemId);
})

.controller('MenuController', function($scope, $stateParams, Feeds) {
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
});
