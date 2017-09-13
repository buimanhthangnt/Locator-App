angular.module('locator_app', ['ngRoute']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
		})
		.when('/study', {
			templateUrl: 'option/study/study.view.html',
			controller: 'studyCtrl',
		})
		.otherwise({redirectTo: '/'});
		$locationProvider.html5Mode(true);
}

angular
	.module('locator_app')
	.config(['$routeProvider', '$locationProvider', config]);
