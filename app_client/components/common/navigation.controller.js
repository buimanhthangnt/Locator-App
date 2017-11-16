(function() {
  angular
    .module('locator_app')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication'];
  function navigationCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
    vm.isAdmin = vm.currentUser.email == "admin@gmail.com";

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    }
  }
})();
