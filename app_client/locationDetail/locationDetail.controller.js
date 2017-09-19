angular
	.module('locator_app')
	.controller('locationDetailCtr', locationDetailCtr);
	locationDetailCtr.$inject = ['$routeParams'];
	function locationDetailCtr ($routeParams) {
		var vm = this;
		vm.locationid = $routeParams.locationid;
		vm.pageHeader = vm.locationid;
	}