const {addItem, editItem, getBudget, deleteItem} = require('../controllers/budgetController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget').post(protectedRoute, addItem);
router.route('/budget').put(protectedRoute, editItem);
router.route('/budget').get(protectedRoute, getBudget);
router.route('/budget/:id').delete(protectedRoute, deleteItem);

module.exports = router;