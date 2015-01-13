class FeedsController
  constructor: ($scope, Feeds) ->
    $scope.feeds = Feeds.all()
    $scope.remove = (feed) ->
      Feeds.remove feed

angular.module('bamboo')
  .controller('FeedsController', [
    '$scope'
    'Feeds'
    FeedsController
  ])
