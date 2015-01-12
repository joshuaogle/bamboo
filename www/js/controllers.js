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

.controller('PostsController', function($scope, Posts) {
  $scope.posts = Posts.all();

  $scope.doRefresh = function() {
    $http.get('/new-items')
    .success(function(newItems) {
      $scope.items = newItems;
    })
    .finally(function() {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('MenuController', function($scope, $stateParams, Feeds) {
  $scope.toggleRightSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
});
