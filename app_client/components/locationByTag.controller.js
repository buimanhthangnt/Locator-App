(function () {
	angular
		.module('locator_app')
		.controller('locationByTag', locationByTag);
	locationByTag.$inject = ['$scope', '$http', '$routeParams'];
	function locationByTag($scope, $http, $routeParams) {
		$scope.tag = $routeParams.tag;
		var locationList = function () {
			$http.get(`/api/locations/tag/${$routeParams.tag}`)
				.then(function success(response) {
					$scope.locations = response.data.data;
				}, function error(err) {
					console.log(err);
				});
		};
		locationList();
	}
})();
