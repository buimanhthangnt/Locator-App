angular.module('locator_app', ['ngRoute']);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
		})
		.when('/study', {
			templateUrl: 'option/study.view.html',
			controller: 'studyCtrl',
		})
		.otherwise({redirectTo: '/'});

}

angular
	.module('locator_app')
	.config(['$routeProvider', config]);
