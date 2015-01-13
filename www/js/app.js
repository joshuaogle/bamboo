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
  return $urlRouterProvider.otherwise("stacks");
});

angular.module('bamboo').constant('config', {
  "dribbbleAccessToken": "916a8ccf0526e148068589aa369f00e34084a34be8ed525faf699c1ef963cd45"
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
  function PostsController($scope, $http, Dribbble) {
    Dribbble.parseFeed().then(function(posts) {
      return $scope.posts = posts.data;
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

angular.module('bamboo').controller('PostsController', ['$scope', '$http', 'Dribbble', PostsController]);

var StacksController;

StacksController = (function() {
  function StacksController($scope, Stacks) {
    $scope.posts = Stacks.all();
  }

  return StacksController;

})();

angular.module('bamboo').controller('StacksController', ['$scope', 'Stacks', StacksController]);

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
        console.log(data);
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
