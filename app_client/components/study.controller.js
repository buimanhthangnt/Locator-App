angular
	.module('locator_app')
	.controller('studyCtrl', studyCtrl);
	function studyCtrl ($scope, $http) {
		var vm = this;
		var studyList = function () {
			$http.get('/api/locations/study')
				.then(function success(response) {
					let locationData = JSON.parse(response.data);
					$scope.data = {locations: locationData};
					console.log($scope.data.locations);
				}, function error(err) {
					console.log(err);
				});
		};
		studyList();
	}
