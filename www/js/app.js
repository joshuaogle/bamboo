angular.module("bamboo", ["ionic"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {});
});

angular.module('bamboo').constant('config', {
  "dribbbleAccessToken": "916a8ccf0526e148068589aa369f00e34084a34be8ed525faf699c1ef963cd45",
  "designerNewsAccessToken": "750ab22aac78be1c6d4bbe584f0e3477064f646720f327c5464bc127100a1a6d"
});

var FeedsController;

FeedsController = (function() {
  function FeedsController($scope, Feeds) {
    $scope.feeds = Feeds.all();
    $scope.remove = function(feed) {
      return Feeds.remove(feed);
    };
  }

  return FeedsController;

})();

angular.module('bamboo').controller('FeedsController', ['$scope', 'Feeds', FeedsController]);

var MenuController;

MenuController = (function() {
  function MenuController($scope, $ionicSideMenuDelegate, Feeds) {
    $scope.feeds = Feeds.all();
    $scope.toggleRightSideMenu = $ionicSideMenuDelegate.toggleRight();
  }

  return MenuController;

})();

angular.module('bamboo').controller('MenuController', ['$scope', '$ionicSideMenuDelegate', 'Feeds', MenuController]);

var PostsController;

PostsController = (function() {
  function PostsController($scope, $http, Dribbble, HackerNews, DesignerNews) {
    Dribbble.parseFeed().then(function(posts) {
      return $scope.dribbble = posts.data;
    });
    HackerNews.parseFeed().then(function(posts) {
      var all_posts, id, _i, _len, _ref;
      all_posts = [];
      _ref = posts.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        HackerNews.parsePost(id).then(function(post) {
          return all_posts.push(post.data);
        });
      }
      return $scope.hacker_news = all_posts;
    });
    DesignerNews.parseFeed().then(function(posts) {
      console.log(posts.data.stories);
      return $scope.designer_news = posts.data.stories;
    });
    $scope.doRefresh = function() {
      return $http.get("/new-items").success(function(newItems) {
        return $scope.items = newItems;
      })["finally"](function() {
        return $scope.$broadcast('scroll.refreshComplete');
      });
    };
  }

  return PostsController;

})();

angular.module('bamboo').controller('PostsController', ['$scope', '$http', 'Dribbble', 'HackerNews', 'DesignerNews', PostsController]);

var StacksController;

StacksController = (function() {
  function StacksController($scope, $ionicSlideBoxDelegate, pageTitle) {
    $scope.change = function(index) {
      var current, title;
      title = document.querySelector(".title");
      current = document.getElementsByClassName("stack")[index].dataset.title;
      title.innerHTML = current;
      return title.dataset.brand = current.toLowerCase().replace(" ", "_");
    };
  }

  return StacksController;

})();

angular.module('bamboo').controller('StacksController', ['$scope', '$ionicSlideBoxDelegate', 'pageTitle', StacksController]);

var designerNewsFactory;

designerNewsFactory = function($http, $q, $config) {
  var Dribbble;
  return new (Dribbble = (function() {
    var deferred, designerNewsAPI;

    function Dribbble() {}

    deferred = $q.defer();

    designerNewsAPI = "https://api-news.layervault.com/api/v1/stories?client_id=" + $config.designerNewsAccessToken;

    Dribbble.prototype.parseFeed = function() {
      return $http.get(designerNewsAPI).success(function(data, status, headers, config) {
        return data;
      }).error(function(data, status, headers, config) {
        return console.error('Error fetching feed:', data);
      });
    };

    return Dribbble;

  })());
};

angular.module('bamboo').factory('DesignerNews', ["$http", "$q", "config", designerNewsFactory]);

var dribbbleFactory;

dribbbleFactory = function($http, $q, $config) {
  var Dribbble;
  return new (Dribbble = (function() {
    var deferred, dribbbleAPI;

    function Dribbble() {}

    deferred = $q.defer();

    dribbbleAPI = "https://api.dribbble.com/v1/shots?access_token=" + $config.dribbbleAccessToken;

    Dribbble.prototype.parseFeed = function() {
      return $http.get(dribbbleAPI).success(function(data, status, headers, config) {
        return data;
      }).error(function(data, status, headers, config) {
        return console.error('Error fetching feed:', data);
      });
    };

    return Dribbble;

  })());
};

angular.module('bamboo').factory('Dribbble', ["$http", "$q", "config", dribbbleFactory]);

var feedsFactory;

feedsFactory = function() {
  var Feeds;
  return new (Feeds = (function() {
    var feeds;

    function Feeds() {}

    feeds = [
      {
        name: "Dribbble",
        "class": "dribbble"
      }, {
        name: "Hacker News",
        "class": "hacker_news"
      }, {
        name: "Designer News",
        "class": "designer_news"
      }, {
        name: "Behance",
        "class": "behance"
      }, {
        name: "Product Hunt",
        "class": "product_hunt"
      }
    ];

    Feeds.prototype.all = function() {
      return feeds;
    };

    Feeds.prototype.remove = function(feed) {
      return feeds.splice(feeds.indexOf(feed), 1);
    };

    Feeds.prototype.get = function(itemId) {
      var i;
      i = 0;
      while (i < feeds.length) {
        if (feeds[i].id === parseInt(itemId)) {
          return feeds[i];
        }
        i++;
      }
      return null;
    };

    return Feeds;

  })());
};

angular.module('bamboo').factory('Feeds', [feedsFactory]);

var hackerNewsFactory;

hackerNewsFactory = function($http, $q) {
  var hackerNews;
  return new (hackerNews = (function() {
    var deferred, topStoriesAPI;

    function hackerNews() {}

    deferred = $q.defer();

    topStoriesAPI = "https://hacker-news.firebaseio.com/v0/topstories.json";

    hackerNews.prototype.parseFeed = function() {
      return $http.get(topStoriesAPI).success(function(data, status, headers, config) {
        var posts;
        return posts = [];
      }).error(function(data, status, headers, config) {
        return console.error('Error fetching feed:', data);
      });
    };

    hackerNews.prototype.parsePost = function(id) {
      return $http.get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json").success(function(data, status, headers, config) {
        return data;
      }).error(function(data, status, headers, config) {
        return console.error('Error fetching item:', data);
      });
    };

    return hackerNews;

  })());
};

angular.module('bamboo').factory('HackerNews', ["$http", "$q", hackerNewsFactory]);

var pageTitleFactory,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

pageTitleFactory = function() {
  var PageTitle;
  return new (PageTitle = (function() {
    function PageTitle() {
      this.clear = __bind(this.clear, this);
      this.get = __bind(this.get, this);
      this.set = __bind(this.set, this);
    }

    PageTitle.prototype.set = function(title) {
      return this.title = title;
    };

    PageTitle.prototype.get = function() {
      return this.title;
    };

    PageTitle.prototype.clear = function() {
      return this.title = '';
    };

    return PageTitle;

  })());
};

angular.module('bamboo').factory('pageTitle', [pageTitleFactory]);
