angular.module('locator_app').service('geolocation', geolocation);

function geolocation() {
    var getLocation = function(success, error, noGeo) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            noGeo();
        }
    }
    let getDistanceFromLatLonInKm = function(lat1, long1, lat2, long2) {
        let deg2rad = function(deg) {
            return deg * (Math.PI / 180)
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(long2 - long1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    var getDistances = function(coords) {
        return new Promise((resolve, reject) => {
            let getPosition = (position) => {
                long1 = position.coords.longitude;
                lat1 = position.coords.latitude;
                let distances = [];
                coords.forEach(coord => {
                    let distance = getDistanceFromLatLonInKm(lat1, long1, coord.lat, coord.long);
                    if (distance < 1) distance = Math.round(distance * 1000) + "m";
                    else distance = Math.round(distance * 10) / 10 + "km";
                    distances.push(distance);
                });
                resolve(distances);
            }
            let handleError = (_error) => {
                reject(_error);
            }
            let handleUnsupport = () => {
                reject("Browser does not support location");
            }
            getLocation(getPosition, handleError, handleUnsupport);
        });
    }
    return {getDistances: getDistances}
}
