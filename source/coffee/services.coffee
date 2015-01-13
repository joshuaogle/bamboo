angular.module("bamboo.services", []).factory("Feeds", ->
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
    return

  get: (itemId) ->
    i = 0

    while i < feeds.length
      return feeds[i]  if feeds[i].id is parseInt(itemId)
      i++
    null
).factory "Posts", ->
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
    posts.splice posts.indexOf(post), 1
    return

  get: (itemId) ->
    i = 0

    while i < posts.length
      return posts[i]  if posts[i].id is parseInt(itemId)
      i++
    null
