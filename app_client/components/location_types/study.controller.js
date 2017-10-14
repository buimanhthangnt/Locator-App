(function () {
	angular
		.module('locator_app')
		.controller('studyCtrl', studyCtrl);
	studyCtrl.$inject = ['$scope', '$http'];
	function studyCtrl($scope, $http) {
		var vm = this;
		var studyList = function () {
			$http.get('/api/locations/type/study')
				.then(function success(response) {
					$scope.locations = response.data.data;
				}, function error(err) {
					console.log(err);
				});
		};
		studyList();
	}

})();