const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getBudget, postBudget, deleteBudget, getFeatures, updateBudget} = require('../controller/budgetControllers');


router.route('/budget').get(protectedRoute, getBudget);
router.route('/budget').post(protectedRoute, postBudget);
router.route('/budget').put(protectedRoute, updateBudget);
router.route('/features').get(protectedRoute, getFeatures);
router.route('/budget/:id').delete(protectedRoute, deleteBudget);


module.exports = router;