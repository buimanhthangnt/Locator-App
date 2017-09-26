angular
	.module('locator_app')
	.controller('locationDetailCtrl', locationDetailCtrl);
	
	function locationDetailCtrl ($scope, $http) {
		console.log("This is test");
		var studyList = function () {
			$http.get('/api/locations/study/')
				.then(function success(response) {
					$scope.data = {locations: response.data};
					console.log($scope.data.locations);
				}, function error(err) {
					console.log(err);
				});
		};
		studyList();
	}