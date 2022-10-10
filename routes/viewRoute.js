const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
// when we have just one thing to export we use module.export=the thing
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
// when we have just one thing to export we use module.export=the thing
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
// router.get('/logout', authController.logout);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyBookings);
//in case of form
router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

module.exports = router;
