angular.module('locator_app', ['ngRoute']);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',

		})
		.otherwise({redirectTo: '/'});

}

angular
	.module('locator_app')
	.config(['$routeProvider', config]);
