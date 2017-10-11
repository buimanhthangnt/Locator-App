angular
	.module('locator_app')
	.controller('locationDetailCtrl', locationDetailCtrl);
	locationDetailCtrl.$inject = ['$routeParams', '$http'];
	function locationDetailCtrl ($scope, $http, $routeParams) {
		// let id = $routeParams.locationid;
		// console.log($routeParams.locationid);
		$scope.data1 = "Test";
		var studyList = function () {
			$http.get('/api/locations/1') // this is hardcode, it has to be fixed
				.then(function success(response) {
					$scope.data = response.data[0];
					console.log($scope.data);
				}, function error(err) {
					console.log(err);
				});
		};
		studyList();
	}