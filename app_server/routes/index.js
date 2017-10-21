var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var authen = require('../authen/authentication');
var ctrlUsers = require('../controllers/users');

// locations
router.get('/locations/type/:type', ctrlLocations.locationList);
router.post('/locations/addlocation', ctrlLocations.addLocation);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);

//authentication
router.post('/register', authen.register);
router.post('/login', authen.login);

//users
router.get('/users/info', ctrlUsers.usersReadOne);

//reviews
router.post('locations/:locationid/reviews', ctrlReviews.addReview);
module.exports = router;
