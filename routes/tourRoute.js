const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
// param middlewares only run for certain parameters
//router.param("id", tourController.checkID);

router.route('/').get(tourController.getAllTours).post(
  //  tourController.checkBody,
  tourController.createTour
);
//checkbody is  a midlleware to check the body if everything is okay it will then pass to the next() middleware which is createTour
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// when we have just one thing to export we use module.export=the thing

module.exports = router;
