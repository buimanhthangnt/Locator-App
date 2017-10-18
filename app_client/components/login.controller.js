(function () {
  angular
    .module('locator_app')
    .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location', '$http'];

    function loginCtrl($location, $http){
      var vm = this;

      vm.returnPage = $location.search().page || '/';

      vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.email || !vm.password) {
          vm.formError = "All fields required, please try again!";
          return;
        } else {
          vm.doLogin();
        }
      };

      vm.doLogin = function() {
        vm.formError = "";
        $http.post('/api/login', {
          email: vm.email,
          password: vm.password
        }).then((res) => {
          alert(res.data.msg);
        }, (err) => {
          throw new Error(err);
        })
      };
    }
})();