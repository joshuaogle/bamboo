angular.module("bamboo", ["ionic", "bamboo.controllers", "bamboo.services"]).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {});
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("stacks", {
    url: "/stacks",
    views: {
      stacks: {
        templateUrl: "templates/stacks.html",
        controller: "StacksController"
      }
    }
  }).state("feeds", {
    url: "/feeds",
    views: {
      feeds: {
        templateUrl: "templates/feeds.html",
        controller: "FeedsController"
      }
    }
  });
  $urlRouterProvider.otherwise("stacks");
});
