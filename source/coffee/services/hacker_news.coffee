hackerNewsFactory = ($http, $q) ->
  new class hackerNews
    deferred = $q.defer()
    topStoriesAPI = "https://hacker-news.firebaseio.com/v0/topstories.json"
    parseFeed: ->
      $http.get(topStoriesAPI)
        .success (data, status, headers, config) ->
          posts = []

        .error (data, status, headers, config) ->
          console.error('Error fetching feed:', data)

    parsePost: (id) ->
      $http.get("https://hacker-news.firebaseio.com/v0/item/#{id}.json")
        .success (data, status, headers, config) ->
          return data

        .error (data, status, headers, config) ->
          console.error('Error fetching item:', data)

angular.module('bamboo')
  .factory('HackerNews', [
    "$http"
    "$q"
    hackerNewsFactory
  ])
