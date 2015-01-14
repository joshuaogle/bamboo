class MenuController
  constructor: ($scope, $ionicSideMenuDelegate, Feeds) ->
    $scope.feeds = Feeds.all()
    $scope.toggleRightSideMenu =  $ionicSideMenuDelegate.toggleRight()

angular.module('bamboo')
  .controller('MenuController', [
    '$scope'
    '$ionicSideMenuDelegate'
    'Feeds'
    MenuController
  ])
