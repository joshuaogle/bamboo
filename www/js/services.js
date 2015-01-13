angular.module("bamboo.services", []).factory("Feeds", function() {
  var feeds;
  feeds = [
    {
      name: "Dribbble"
    }, {
      name: "Hacker News"
    }, {
      name: "Designer News"
    }, {
      name: "Behance"
    }, {
      name: "Product Hunt"
    }
  ];
  return {
    all: function() {
      return feeds;
    },
    remove: function(feed) {
      feeds.splice(feeds.indexOf(feed), 1);
    },
    get: function(itemId) {
      var i;
      i = 0;
      while (i < feeds.length) {
        if (feeds[i].id === parseInt(itemId)) {
          return feeds[i];
        }
        i++;
      }
      return null;
    }
  };
}).factory("Posts", function() {
  var posts;
  posts = [
    {
      name: "1"
    }, {
      name: "1"
    }, {
      name: "2"
    }, {
      name: "3"
    }, {
      name: "4"
    }
  ];
  return {
    all: function() {
      return posts;
    },
    remove: function(item) {
      posts.splice(posts.indexOf(post), 1);
    },
    get: function(itemId) {
      var i;
      i = 0;
      while (i < posts.length) {
        if (posts[i].id === parseInt(itemId)) {
          return posts[i];
        }
        i++;
      }
      return null;
    }
  };
});
