(function() {
    angular.module('locator_app').controller('locationTypeCtrl', locationTypeCtrl);
    locationTypeCtrl.$inject = ['$scope', '$http', '$routeParams', '$timeout', 'geolocation'];
    function locationTypeCtrl($scope, $http, $routeParams, $timeout, geolocation) {
        $scope.pageSize = 6;
        $scope.type = $routeParams.type;
        var locationList = function() {
            $http.get(`/api/locations/type/${$routeParams.type}`).then(function success(response) {
                $scope.locations = response.data.data;
								let coords = [];
								$scope.locations.forEach(location => {
									coords.push({long: location.longitude, lat: location.latitude});
								});
								geolocation.getDistances(coords).then(distances => {
									let newLocations = response.data.data;
									for (let i = 0; i < distances.length; i++) {
										newLocations[i].distance = distances[i];
									}
									$timeout (() => {
									  $scope.locations = newLocations;
									}, 0);
								}, err => {
									throw new Error(err);
								});
            }, function error(err) {
                console.log(err);
            });
        };

        locationList();
        let lat = 21.00229030419171;
        let long = 105.7931041742529;
        // geolocation.getDistance(long, lat).then(distance => {
        //     console.log(distance);
        // });
    }
})();
