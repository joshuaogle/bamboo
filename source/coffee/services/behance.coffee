behanceFactory = ($http, $q, $config) ->
  new class Behance
    deferred = $q.defer()
    behanceAPI = "http://behance.net/v2/projects"
    parseFeed: ->
      $http
        method: 'jsonp'
        url: behanceAPI
        params:
          client_id: $config.behanceAccessToken
          callback: 'JSON_CALLBACK'

      .success (data, status, headers, config) ->
        return data

      .error (data, status, headers, config) ->
        console.error('Error fetching feed:', data)

angular.module('bamboo')
  .factory('Behance', [
    "$http"
    "$q"
    "config"
    behanceFactory
  ])
