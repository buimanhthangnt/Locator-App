(function () {
	angular
		.module('locator_app')
		.directive('ratingStars', ratingStars);
	function ratingStars() {
		return {
			restrict: 'EA',
			scope: {
				thisRating: '=rating'
			},
			templateUrl: 'components/common/ratingStars.template.html'
		};
	}
})();