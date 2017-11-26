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
		let timeout;
		vm.query = function () {
			if (!vm.searchText || vm.searchText == "") {
				vm.searchLocations = [];
				return;
			}
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				$http.get(`/api/locations/name?name=${vm.searchText}`)
					.then(res => {
						if (vm.searchText == "") vm.searchLocations = [];
						else vm.searchLocations = res.data.data;
					}, err => {
						vm.searchLocations = [];
						console.log(err);
					});
			}, 800);
		}
	}
})();
