dribbbleFactory = ($http, $q, $config) ->
  new class Dribbble
    deferred = $q.defer()
    dribbbleAPI = "https://api.dribbble.com/v1/shots"
    parseFeed: ->
      $http
        method: 'get'
        url: dribbbleAPI
        params:
          access_token: $config.dribbbleAccessToken
          
      .success (data, status, headers, config) ->
        return data

      .error (data, status, headers, config) ->
        console.error('Error fetching feed:', data)

angular.module('bamboo')
  .factory('Dribbble', [
    "$http"
    "$q"
    "config"
    dribbbleFactory
  ])
