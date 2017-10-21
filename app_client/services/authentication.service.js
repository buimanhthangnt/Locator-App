(function() {
  angular
    .module('locator_app')
    .service('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$route'];
    function authentication ($http, $window, $route) {
      var saveToken = function(token) {
        $window.localStorage['locator_app-token'] = token;
      };
      var getToken = function() {
        return $window.localStorage['locator_app-token'];
      };
      var register = function(user, handleError) {
        return $http.post('/api/register', user);
      };
      var login = function(user, handleError) {
        return $http.post('/api/login', user);
      };
      var logout = function() {
        $window.localStorage.removeItem('locator_app-token');
        $route.reload();
      };
      var isLoggedIn = function() {
        var token = getToken();
        
        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.exp > Date.now() / 1000;
        }
        else {
          return false;
        }
      };
      var currentUser = function() {
        if(isLoggedIn()) {
          var token = getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return {
            email: payload.email,
            name: payload.name
          };
        }
      };
      return {
        saveToken: saveToken,
        getToken: getToken,
        register: register,
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser
      };
    }
})();