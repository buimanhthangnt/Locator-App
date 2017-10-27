(function() {
    angular.module('locator_app').controller('userInfoCtrl', userInfoCtrl)
    userInfoCtrl.$inject = ['$http', '$window', 'authentication'];

  function userInfoCtrl($http, $window, authentication) {
    var vm = this;
    vm.isEdit = false;
    let config = {headers: {
      jwt: $window.localStorage['locator_app-token']
      }
    };
    $http.get('/api/users/info', config)
      .then(function success(response) {
        vm.userInfo = response.data.data;
      }, function error(err) {
        console.log(err);
      });
    vm.isEditing = function () {
      vm.isEdit = !vm.isEdit;
      console.log(vm.isEdit);
      return vm.isEdit;
    };
  }
})();
