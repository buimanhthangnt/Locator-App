(function() {
    angular.module('locator_app').controller('userInfoCtrl', userInfoCtrl)
    userInfoCtrl.$inject = ['$http', '$window', 'authentication'];

    function userInfoCtrl($http, $window, authentication) {
        let vm = this;
        let config = {
            headers: {
                jwt: $window.localStorage['locator_app-token']
            }
        };
        $http.get('/api/users/info', config).then(function success(response) {
            vm.userInfo = response.data.data;
            console.log(vm.userInfo.name);
        }, function error(err) {
            console.log(err);
        });
    }
})();
