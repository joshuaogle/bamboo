class StacksController
  constructor: ($scope, $ionicSlideBoxDelegate, pageTitle) ->
    $scope.change = (index) ->
      title = document.querySelector(".title")
      current = document.getElementsByClassName("stack")[index].dataset.title
      title.innerHTML = current
      title.dataset.brand = current.toLowerCase().replace(" ", "_")

angular.module('bamboo')
  .controller('StacksController', [
    '$scope'
    '$ionicSlideBoxDelegate'
    'pageTitle'
    StacksController
  ])
