// Bamboo
angular.module('bamboo', ['ionic', 'bamboo.controllers', 'bamboo.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/tab/stacks');
});
