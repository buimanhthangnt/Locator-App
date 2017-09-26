angular
  .module('locator_app')
  .directive('ratingStars', ratingStars);
function ratingStars () {
  return {
    restrict: 'EA',
    scope: {
      thisRating : '=rating'
    },
    templateUrl: '/common/ratingStars/ratingStars.template.html'
  };
}