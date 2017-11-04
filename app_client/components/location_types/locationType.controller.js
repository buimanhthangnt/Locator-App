(function() {
    angular.module('locator_app').controller('locationTypeCtrl', locationTypeCtrl);
    locationTypeCtrl.$inject = ['$scope', '$http', '$routeParams', '$timeout', 'geolocation', '$route'];
    function locationTypeCtrl($scope, $http, $routeParams, $timeout, geolocation, $route) {
        $scope.pageSize = 6;
        $scope.type = $routeParams.type;
        var locationList = function() {
            $http.get(`/api/locations/type/${$routeParams.type}`).then(function success(response) {
                $scope.locations = response.data.data;
                $scope.numberOfLocations = $scope.locations.length;
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

        $scope.sortByRating = function() {
            function compare(a, b) {
                return b.rating - a.rating;
            }
            $scope.locations = $scope.locations.sort(compare);
        };

        $scope.sortByDistance = function() {
            function compare(a, b) {
                if (a.distance.charAt(a.distance.length - 2) == 'k' && b.distance.charAt(b.distance.length - 2) == 'k')
                    return Number(a.distance.slice(0, a.distance.length - 2)) - Number(b.distance.slice(0, b.distance.length - 2));
                else if (a.distance.charAt(a.distance.length - 2) != 'k' && b.distance.charAt(b.distance.length - 2) == 'k')
                    return 1;
                else if (a.distance.charAt(a.distance.length - 2) == 'k' && b.distance.charAt(b.distance.length - 2) != 'k')
                    return 1;
                else if (a.distance.charAt(a.distance.length - 2) != 'k' && b.distance.charAt(b.distance.length - 2) != 'k')
                    return Number(a.distance.slice(0, a.distance.length - 1)) - Number(b.distance.slice(0, b.distance.length - 1));
            }
            
            $scope.locations = $scope.locations.sort(compare);
        };

        locationList();
        let lat = 21.00229030419171;
        let long = 105.7931041742529;
        // geolocation.getDistance(long, lat).then(distance => {
        //     console.log(distance);
        // });
    }
})();
