const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

//access the tourId from the precedent
const router = express.Router();

router.get(
  '/checkout-session/:id',
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
