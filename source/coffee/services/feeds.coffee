feedsFactory = ->
  new class Feeds
    feeds = [
      {
        name: "Dribbble"
        class: "dribbble"
      }
      {
        name: "Hacker News"
        class: "hacker_news"
      }
      {
        name: "Designer News"
        class: "designer_news"
      }
      {
        name: "Behance"
        class: "behance"
      }
      {
        name: "Product Hunt"
        class: "product_hunt"
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
