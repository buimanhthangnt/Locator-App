(function () {
    angular.module('locator_app').directive('navigation', navigation);

    function navigation() {
        return { 
            restrict: 'EA', 
            templateUrl: 'components/common/navigation.template.html',
            controller: 'navigationCtrl as navvm'
        };
    }
})();