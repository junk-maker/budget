const {getBudget, addBudget, editBudget, deleteBudget} = require('../controller/budgetControllers');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget').get(protectedRoute, getBudget);
router.route('/budget').post(protectedRoute, addBudget);
router.route('/budget').put(protectedRoute, editBudget);
router.route('/budget/:id').delete(protectedRoute, deleteBudget);

module.exports = router;