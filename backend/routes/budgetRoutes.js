const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getBudget, postBudget, getFeatures} = require('../controller/budgetControllers');

router.route('/budget').get(protectedRoute, getBudget);
router.route('/features').get(protectedRoute, getFeatures);
router.route('/budget').post(postBudget);


module.exports = router;