class PostsController
  constructor: ($scope, $http, Dribbble) ->
    Dribbble.parseFeed().then (posts) ->
      $scope.posts = posts.data

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
    '$http'
    'Dribbble'
    PostsController
  ])
