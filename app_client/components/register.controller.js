(function () {
  angular
    .module('locator_app')
    .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', '$http'];

    function registerCtrl($location, $http){
      var vm = this;

      vm.returnPage = $location.search().page || '/';

      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.name || !vm.email || !vm.password1 || !vm.password2) {
          vm.formError = "All fields required, please try again!";
          return;
        } else if (vm.password1 !== vm.password2) {
          vm.formError = "Your password does not match, please try again!";
          return;
        } else {
          vm.doRegister();
        }
      };

      vm.doRegister = function() {
        vm.formError = "";
        $http.post('/api/register', {
          name: vm.name,
          email: vm.email,
          password: vm.password1
        }).then((res) => {
          alert(res.data.msg);
        }, (err) => {
          vm.formError = err.data.msg;
          console.log(err.data.msg);
        })
      };
    }
})();