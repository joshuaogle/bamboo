feedsFactory = ->
  new class Feeds
    feeds = [
      {
        name: "Dribbble"
      }
      {
        name: "Hacker News"
      }
      {
        name: "Designer News"
      }
      {
        name: "Behance"
      }
      {
        name: "Product Hunt"
      }
    ]

    all: ->
      feeds

    remove: (feed) ->
      feeds.splice feeds.indexOf(feed), 1

    get: (itemId) ->
      i = 0

      while i < feeds.length
        return feeds[i] if feeds[i].id is parseInt(itemId)
        i++
      null

angular.module('bamboo')
  .factory('Feeds', [feedsFactory])
