class StacksController
  constructor: ($scope, Stacks) ->
    $scope.posts = Stacks.all()

angular.module('bamboo')
  .controller('StacksController', [
    '$scope'
    'Stacks'
    StacksController
  ])
