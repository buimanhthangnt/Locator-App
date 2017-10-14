(function () {
	angular
		.module('locator_app')
		.controller('datingCtrl', datingCtrl);
	datingCtrl.$inject = ['$scope', '$http'];
	function datingCtrl($scope, $http) {
		var vm = this;
		var datingList = function () {
			$http.get('/api/locations/type/dating')
				.then(function success(response) {
					$scope.locations = response.data.data;
					console.log($scope.data);
				}, function error(err) {
					console.log(err);
				});
		};
		datingList();
	}

})();