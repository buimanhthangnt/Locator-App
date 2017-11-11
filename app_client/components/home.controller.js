(function () {
	angular
		.module('locator_app')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ["$http"];
	function homeCtrl($http) {
		let vm = this;
		vm.searchLocations = [];
		vm.query = function () {
			if (vm.searchText == "") {
				vm.searchLocations = [];
				return;
			}
			$http.get(`/api/locations/name?name=${vm.searchText}`)
				.then(res => {
					vm.searchLocations = res.data.data;
				}, err => {
					console.log(err);
				});
		}
	}
})();
