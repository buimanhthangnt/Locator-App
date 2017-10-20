(function () {
	angular
		.module('locator_app')
		.controller('workCtrl', workCtrl);
	workCtrl.$inject = ['$scope', '$http'];
	function workCtrl($scope, $http) {
		var vm = this;
		var workList = function () {
			$http.get('/api/locations/type/work')
				.then(function success(response) {
					$scope.locations = response.data.data;
				}, function error(err) {
					console.log(err);
				});
		};
		workList();
	}

})();
