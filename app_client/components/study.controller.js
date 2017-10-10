angular
	.module('locator_app')
	.controller('studyCtrl', studyCtrl);
	function studyCtrl ($scope, $http) {
		var vm = this;
		var studyList = function () {
			$http.get('/api/locations/study')
				.then(function success(response) {
					$scope.locations = response.data;
					console.log($scope.data);
				}, function error(err) {
					console.log(err);
				});
		};
		studyList();
	}
