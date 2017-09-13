angular
.module('locator_app')
.directive('endcontent', endcontent);

function endcontent () {
  return {
    restrict: 'EA',
    templateUrl: '/common/endcontent/endcontent.template.html'
  };
}