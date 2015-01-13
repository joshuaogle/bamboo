# Bamboo
angular.module("bamboo", ["ionic"])
  .run(($ionicPlatform) ->
    $ionicPlatform.ready ->
).config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state("stacks",
    url: "/stacks"
    views:
      stacks:
        templateUrl: "templates/stacks.html"
        controller: "StacksController"
  ).state "feeds",
    url: "/feeds"
    views:
      feeds:
        templateUrl: "templates/feeds.html"
        controller: "FeedsController"

  $urlRouterProvider.otherwise "stacks"
