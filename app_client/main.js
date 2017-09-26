angular.module('locator_app', ['ngRoute']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
		})
		.when('/addlocation', {
			templateUrl: 'addLocation/addLocation.view.html',
			controller: 'addLocationCtrl',
		})
		.when('/study', {
			templateUrl: 'option/study/study.view.html',
			controller: 'studyCtrl',
		})
		.when('/location', {
			templateUrl: 'locationDetail/locationDetail.view.html',
			controller: 'locationDetailCtrl',
		})
		.when('/location/:locationid', {
			templateUrl: '/locationDetail/locationDetail.view.html',
			controller: 'locationDetailCtrl',
		})
		.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
}

angular
	.module('locator_app')
	.config(['$routeProvider', '$locationProvider', config]);
