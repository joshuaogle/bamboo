postsFactory = ->
  new class Posts
    posts = [
      {
        name: "1"
      }
      {
        name: "1"
      }
      {
        name: "2"
      }
      {
        name: "3"
      }
      {
        name: "4"
      }
    ]

    all: ->
      posts

    remove: (item) ->
      posts.splice posts.indexOf(item), 1

    get: (itemId) ->
      i = 0

      while i < posts.length
        return posts[i] if posts[i].id is parseInt(itemId)
        i++
      null

angular.module('bamboo')
  .factory('Posts', [postsFactory])
