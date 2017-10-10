angular.module('locator_app', ['ngRoute']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'components/home.view.html',
			controller: 'homeCtrl',
		})
		.when('/addlocation', {
			templateUrl: 'components/addLocation.view.html',
			controller: 'addLocationCtrl',
			controllerAs: 'vm'
		})
		.when('/locations/type/study', {
			templateUrl: 'components/study.view.html',
			controller: 'studyCtrl',
		})
		.when('/locations/type/work', {
			templateUrl: 'components/work.view.html',
			controller: 'workCtrl',
		})
		.when('/locations/type/dating', {
			templateUrl: 'components/dating.view.html',
			controller: 'datingCtrl',
		})
		.when('/location', {
			templateUrl: 'components/locationDetail.view.html',
			controller: 'locationDetailCtrl',
		})
		.when('/location/:locationid', {
			templateUrl: 'components/locationDetail.view.html',
			controller: 'locationDetailCtrl',
		})
		.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
}

angular
	.module('locator_app')
	.config(['$routeProvider', '$locationProvider', config]);
