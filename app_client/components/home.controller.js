(function () {
	angular
		.module('locator_app')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ["$http", "authentication"];
	function homeCtrl($http, authentication) {
		let vm = this;
		vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
    vm.isAdmin = vm.currentUser.email == "admin@gmail.com";
		vm.searchLocations = [];
		vm.query = function () {
			if (!vm.searchText || vm.searchText == "") {
				vm.searchLocations = [];
				return;
			}
			$http.get(`/api/locations/name?name=${vm.searchText}`)
				.then(res => {
					vm.searchLocations = res.data.data;
				}, err => {
					vm.searchLocations = [];
					console.log(err);
				});
		}
	}
})();
