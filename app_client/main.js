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
		.when('/study', {
			templateUrl: 'components/study.view.html',
			controller: 'studyCtrl',
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
