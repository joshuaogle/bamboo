class PostsController
  constructor: ($scope, Posts) ->
    $scope.posts = Posts.all()
    $scope.doRefresh = ->
      $http
        .get("/new-items")
        .success (newItems) ->
          $scope.items = newItems
        .finally ->
          $scope.$broadcast('scroll.refreshComplete')

angular.module('bamboo')
  .controller('PostsController', [
    '$scope'
    'Posts'
    PostsController
  ])
