(function() {
    angular.module('locator_app').controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$http', '$window', 'authentication', 'geolocation', '$timeout'];
    function locationDetailCtrl($routeParams, $http, $window, authentication, geolocation, $timeout) {
        let vm = this;
        let id = $routeParams["locationid"];
        $http.get('/api/locations/' + id).then(function success(response) {
            vm.data = response.data.data;
            let coords = [{long: vm.data.longitude, lat: vm.data.latitude}];
            geolocation.getDistances(coords).then(distances => {
              $timeout(() => {
                vm.data.distance = distances[0];
              }, 0);
            })
        }, function error(err) {
            console.log(err);
        });
        $http.get(`/api/locations/${id}/reviews`)
            .then(res => {
                vm.reviews = res.data.data.sort((a, b) => {return a.created_time < b.created_time});
            }, err => {
                alert('Can not get reviews for location');
            })
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.addReview = function() {
            if (!vm.formData || !vm.formData.rating || !vm.formData.reviewText) {
                vm.formError = "All fields required";
                return;
            }
            let config = {
                headers: {
                    jwt: $window.localStorage['locator_app-token']
                }
            }
			$http.post(`/api/locations/${id}/reviews/add`, {rating: vm.formData.rating, reviewText: vm.formData.reviewText}, config)
				.then(res => {
					vm.reviews.unshift({
                        id: res.data.data.insertId,
                        name: authentication.currentUser().name,
                        rating: vm.formData.rating,
                        content: vm.formData.reviewText,
                        created_time: Date.now()
                    });
					$('#reviewModal').modal('hide');
					vm.formError = null;
					vm.formData = null;
				}, err => {
					vm.formError = err;
				})
        }
	}
})();
