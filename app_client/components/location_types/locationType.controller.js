(function () {
	angular
		.module('locator_app')
		.controller('locationTypeCtrl', locationTypeCtrl);
	locationTypeCtrl.$inject = ['$scope', '$http', '$routeParams'];
	function locationTypeCtrl($scope, $http, $routeParams) {
		$scope.pageSize = 3;
		$scope.type = $routeParams.type;
		var locationList = function () {
			$http.get(`/api/locations/type/${$routeParams.type}`)
				.then(function success(response) {
					$scope.locations = response.data.data;
				}, function error(err) {
					console.log(err);
				});
		};
		locationList();
	}

})();
