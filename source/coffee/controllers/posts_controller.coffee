class PostsController
  constructor: ($scope, $http, Dribbble, HackerNews, DesignerNews, Behance) ->

    Dribbble.parseFeed().then (posts) ->
      $scope.dribbble = posts.data

    HackerNews.parseFeed().then (posts) ->
      all_posts = []
      for id in posts.data
        HackerNews.parsePost(id).then (post) ->
          all_posts.push post.data
      $scope.hacker_news = all_posts

    DesignerNews.parseFeed().then (posts) ->
      $scope.designer_news = posts.data.stories

    Behance.parseFeed().then (posts) ->
      $scope.behance = posts.data.projects

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
    'HackerNews'
    'DesignerNews'
    'Behance'
    PostsController
  ])
