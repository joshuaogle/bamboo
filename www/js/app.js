angular.module("bamboo", ["ionic"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {});
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("stacks", {
    url: "/stacks",
    views: {
      stacks: {
        templateUrl: "templates/stacks.html",
        controller: "StacksController"
      }
    }
  }).state("feeds", {
    url: "/feeds",
    views: {
      feeds: {
        templateUrl: "templates/feeds.html",
        controller: "FeedsController"
      }
    }
  });
  $urlRouterProvider.otherwise("stacks");
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
  function MenuController($scope, $ionicSideMenuDelegate) {
    $scope.toggleRightSideMenu = $ionicSideMenuDelegate.toggleRight();
  }

  return MenuController;

})();

angular.module('bamboo').controller('MenuController', ['$scope', '$ionicSideMenuDelegate', MenuController]);

var PostsController;

PostsController = (function() {
  function PostsController($scope, Posts) {
    $scope.posts = Posts.all();
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

angular.module('bamboo').controller('PostsController', ['$scope', 'Posts', PostsController]);

var StacksController;

StacksController = (function() {
  function StacksController($scope, Stacks) {
    $scope.posts = Stacks.all();
  }

  return StacksController;

})();

angular.module('bamboo').controller('StacksController', ['$scope', 'Stacks', StacksController]);

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

var postsFactory;

postsFactory = function() {
  var Posts;
  return new (Posts = (function() {
    var posts;

    function Posts() {}

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

    Posts.prototype.all = function() {
      return posts;
    };

    Posts.prototype.remove = function(item) {
      return posts.splice(posts.indexOf(item), 1);
    };

    Posts.prototype.get = function(itemId) {
      var i;
      i = 0;
      while (i < posts.length) {
        if (posts[i].id === parseInt(itemId)) {
          return posts[i];
        }
        i++;
      }
      return null;
    };

    return Posts;

  })());
};

angular.module('bamboo').factory('Posts', [postsFactory]);
