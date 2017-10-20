(function () {
	angular
		.module('locator_app')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject = ['$routeParams', '$http', '$scope'];
	function locationDetailCtrl($routeParams, $http, $scope) {
		let vm = this;
		let id = $routeParams["locationid"];
		$http.get('/api/locations/' + id)
			.then(function success(response) {
				vm.data = response.data.data;
			}, function error(err) {
				console.log(err);
			});
	}
})();
