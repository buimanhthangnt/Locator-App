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
router.get('/locations/tag/:tagname', ctrlLocations.locationsByTag);

//authentication
router.post('/register', authen.register);
router.post('/login', authen.login);

//users
router.get('/users/info', ctrlUsers.usersReadOne);
router.put('/users/update', ctrlUsers.usersUpdateOne);

//reviews
router.get('/locations/:locationid/reviews', ctrlReviews.reviewsByLocationId);
router.post('/locations/:locationid/reviews/add', ctrlReviews.addReview);
router.delete('/reviews/:reviewid/delete', ctrlReviews.reviewDeleteOne);
module.exports = router;
