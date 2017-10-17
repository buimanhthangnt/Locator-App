var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var authen = require('../authen/authentication');

// locations
router.get('/locations/type/:type', ctrlLocations.locationList);
router.post('/locations/addlocation', ctrlLocations.addLocation);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);

router.post('/register', authen.register);
router.post('/login', authen.login);
// router.get('/locations/work', ctrlLocations.locationsListByDistance);
// router.get('/locations/dating', ctrlLocations.locationsListByDistance);
// router.post('/locations', ctrlLocations.locationsCreate);
// router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
// router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);
// // reviews
// router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
// router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
// router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
// router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);

module.exports = router;
