(function () {
	angular.module('locator_app').directive('myfooter', myfooter);

	function myfooter() {
		return { restrict: 'EA', templateUrl: 'components/common/myfooter.template.html' };
	}
})();
