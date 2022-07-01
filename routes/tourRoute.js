const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();
// param middlewares only run for certain parameters
//router.param("id", tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-state').get(tourController.tourState);

router.route('/monthly-plan/:year').get(tourController.monthlyPlane);

router.route('/').get(tourController.getAllTours).post(
  //  tourController.checkBody,
  tourController.createTour
);
//checkbody is  a midlleware to check the body if everything is okay it will then pass to the next() middleware which is createTour
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// when we have just one thing to export we use module.export=the thing

module.exports = router;
