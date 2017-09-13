angular
  .module('locator_app')
  .directive('sidebar', sidebar);

  function sidebar () {
    return {
      restrict: 'EA',
      templateUrl: '/common/sidebar/sidebar.template.html'
    };
  }