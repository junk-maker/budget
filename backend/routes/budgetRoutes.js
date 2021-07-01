const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getBudget, addBudget, deleteBudget, updateBudget} = require('../controller/budgetControllers');


router.route('/budget').get(protectedRoute, getBudget);
router.route('/budget').post(protectedRoute, addBudget);
router.route('/budget').put(protectedRoute, updateBudget);
router.route('/budget/:id').delete(protectedRoute, deleteBudget);


module.exports = router;