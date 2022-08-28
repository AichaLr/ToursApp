const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
// when we have just one thing to export we use module.export=the thing
router.get('/tour/:slug', viewController.getTour);
// when we have just one thing to export we use module.export=the thing

module.exports = router;
