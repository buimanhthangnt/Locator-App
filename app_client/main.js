(function () {
	angular.module('locator_app', ['ngRoute']);

	config.$inject = ['$routeProvider', '$locationProvider'];
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
			.when('/locations/type/:type', {
				templateUrl: 'components/location_types/locationType.view.html',
				controller: 'locationTypeCtrl',
			})
			.when('/location/:locationid', {
				templateUrl: 'components/locationDetail.view.html',
				controller: 'locationDetailCtrl',
				controllerAs: 'vm'
			})
			.when('/about', {
				templateUrl: 'components/common/aboutPage.view.html'
			})
			.when('/register', {
				templateUrl: 'components/auth/register.view.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.when('/login', {
				templateUrl: 'components/auth/login.view.html',
				controller: 'loginCtrl',
				controllerAs: 'vm'
			})
			.when('/users/info', {
				templateUrl: 'components/userInfo.view.html',
				controller: 'userInfoCtrl',
				controllerAs: 'vm'
			})
			.when('/notfound', {
				templateUrl: 'components/common/notfound.view.html'
			})
			.otherwise({ redirectTo: '/notfound' });
		$locationProvider.html5Mode(true);
	}

	angular
		.module('locator_app')
		.config(['$routeProvider', '$locationProvider', config]);
})();
