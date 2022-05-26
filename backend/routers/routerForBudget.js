const {addItem, editItem, getBudget, deleteItem} = require('../controllers/budgetController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget').put(protectedRoute, editItem);
router.route('/budget').post(protectedRoute, addItem);
router.route('/budget/:id').delete(protectedRoute, deleteItem);
router.route('/budget/:currency').get(protectedRoute, getBudget);

module.exports = router;