angular.module("bamboo.controllers", []).controller("StacksController", ($scope, $stateParams, Stacks) ->
  $scope.stack = Stacks.get($stateParams.itemId)
  return
).controller("FeedsController", ($scope, Feeds) ->
  $scope.feeds = Feeds.all()
  $scope.remove = (feed) ->
    Feeds.remove feed
    return

  return
).controller("PostsController", ($scope, Posts) ->
  $scope.posts = Posts.all()
  $scope.doRefresh = ->
    $http
      .get("/new-items")
      .success (newItems) ->
        $scope.items = newItems
      .finally ->
        $scope.$broadcast('scroll.refreshComplete')

    return

  return
).controller "MenuController", ($scope, $stateParams, Feeds) ->
  $scope.toggleRightSideMenu = ->
    $ionicSideMenuDelegate.toggleRight()
    return

  return
