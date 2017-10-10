angular
  .module('locator_app')
  .controller('datingCtrl', datingCtrl);
function datingCtrl ($scope, $http) {
var vm = this;
var datingList = function () {
  $http.get('/api/locations/type/dating')
    .then(function success(response) {
      $scope.locations = response.data;
      console.log($scope.data);
    }, function error(err) {
      console.log(err);
    });
};
datingList();
}
