designerNewsFactory = ($http, $q, $config) ->
  new class Dribbble
    deferred = $q.defer()
    designerNewsAPI = "https://api-news.layervault.com/api/v1/stories?client_id=" + $config.designerNewsAccessToken
    parseFeed: ->
      $http.get(designerNewsAPI)
        .success (data, status, headers, config) ->
          return data

        .error (data, status, headers, config) ->
          console.error('Error fetching feed:', data)

angular.module('bamboo')
  .factory('DesignerNews', [
    "$http"
    "$q"
    "config"
    designerNewsFactory
  ])
