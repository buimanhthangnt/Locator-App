(function() {
    angular.module('locator_app').controller('userInfoCtrl', userInfoCtrl)
    userInfoCtrl.$inject = ['$http', '$window', 'authentication', '$route'];

  function userInfoCtrl($http, $window, authentication, $route) {
    var vm = this;
    vm.isEdit = false;
    vm.editPassword = false;
    vm.info = {
      name: '',
      email: '',
      password_1: undefined,
      password_2: undefined
    };
    let config = {headers: {
      jwt: $window.localStorage['locator_app-token']
      }
    };
    
    $http.get('/api/users/info', config)
      .then(function success(response) {
        vm.userInfo = response.data.data;
        vm.info.name = vm.userInfo.name;
        vm.info.email = vm.userInfo.email;
        vm.info.comments = vm.userInfo.comments;
      }, function error(err) {
        console.log(err);
      });

    vm.isEditing = function () {
      if (vm.editPassword) {
        if (!vm.info.password_1 || !vm.info.password_2) {
          vm.formError = "All fields required!";
          return;
        }
        else if (vm.info.password_1 != vm.info.password_2) {
          vm.formError = "Your retyped password is not correct!";
          return;
        }
      }
      if (vm.isEdit) {
        // put(url, data, [config]);
        $http.put('/api/users/update', 
        {
          name: vm.info.name,
          email: vm.info.email,
          password: vm.info.password_1 
        }, config)
        .then((res) => {
          alert(res.data.msg);
          authentication.logout();
          alert("Please re-login to continue!");
        }, (err) => {
          vm.formError = err.data.msg;
        });
      }
      vm.isEdit = !vm.isEdit;
      return vm.isEdit;
    };

    vm.editingPassword = function () {
      vm.editPassword = !vm.editPassword;
      return vm.editPassword;
    };

    vm.deleteComment = function (reviewid) {
      $http.delete('/api/reviews/' + reviewid + '/delete', config)
      .then((res) => {
        alert(res.data.msg);
        $route.reload();
      }, (err) => {
        alert(err.data.msg);
      })
    };
  }  
})();
