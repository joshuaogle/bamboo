pageTitleFactory = ->
  new class PageTitle
    set: (title) => @title = title
    get: => @title
    clear: => @title = ''

angular.module('bamboo')
  .factory('pageTitle', [pageTitleFactory])
