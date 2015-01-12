angular.module('bamboo.services', [])

.factory('Feeds', function() {
  var feeds = [{
    name: 'Dribbble'
  }, {
    name: 'Hacker News'
  }, {
    name: 'Designer News',
  }, {
    name: 'Behance',
  }, {
    name: 'Product Hunt',
  }];

  return {
    all: function() {
      return feeds;
    },
    remove: function(feed) {
      feeds.splice(feeds.indexOf(feed), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < chats.length; i++) {
        if (feeds[i].id === parseInt(itemId)) {
          return feeds[i];
        }
      }
      return null;
    }
  }
})
