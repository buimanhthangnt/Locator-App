(function () {
  angular
    .module('locator_app')
    .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', '$http', 'authentication'];

    function registerCtrl($location, $http, authentication){
      var vm = this;

      vm.credentials = {
        name : "",
        email : "",
        password : ""
      };

      vm.returnPage = $location.search().page || '/login';

      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.email || !vm.password1 || !vm.password2) {
          vm.formError = "All fields required, please try again!";
          return;
        } else if (vm.password1 !== vm.password2) {
          vm.formError = "Your password does not match, please try again!";
          return;
        } else {
          vm.credentials.password = vm.password1;
          vm.doRegister();
        }
      };

      vm.doRegister = function() {
        vm.formError = "";
        authentication
          .register(vm.credentials)
          .then((res) => {
            alert("Register successful!");
            $location.path(vm.returnPage);
          }, (err) => {
            vm.formError = err.data.msg;
          })
      };
    }
})();