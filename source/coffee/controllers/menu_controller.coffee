class MenuController
  constructor: ($scope, $ionicSideMenuDelegate) ->
    $scope.toggleRightSideMenu =  $ionicSideMenuDelegate.toggleRight()

angular.module('bamboo')
  .controller('MenuController', [
    '$scope'
    '$ionicSideMenuDelegate'
    MenuController
  ])
