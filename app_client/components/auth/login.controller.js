(function () {
  angular
    .module('locator_app')
    .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location', '$http', 'authentication'];

    function loginCtrl($location, $http, authentication){
      var vm = this;
      vm.credentials = {
        email: '',
        password: ''
      };

      vm.returnPage = $location.search().page || '/';

      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.email || !vm.credentials.password) {
          vm.formError = "All fields required, please try again!";
          return;
        } else {
          vm.doLogin();
        }
      };

      vm.doLogin = function() {
        vm.formError = "";
        authentication
          .login(vm.credentials)
          .then((res) => {
            authentication.saveToken(res.data.data.jwt);
            $location.path(vm.returnPage);
          }, (err) => {
            vm.formError = err.data.msg;
          })
      };
    }
})();