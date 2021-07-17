const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getBudget, addBudget, editBudget, deleteBudget} = require('../controller/budgetControllers');


router.route('/budget').get(protectedRoute, getBudget);
router.route('/budget').post(protectedRoute, addBudget);
router.route('/budget').put(protectedRoute, editBudget);
router.route('/budget/:id').delete(protectedRoute, deleteBudget);


module.exports = router;