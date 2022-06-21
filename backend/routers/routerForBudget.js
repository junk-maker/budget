const {addItem, editItem, getBudget, deleteItem} = require('../controllers/budgetController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget/:currency').put(protectedRoute, editItem);
router.route('/budget/:currency').post(protectedRoute, addItem);
router.route('/budget/:id/:currency').delete(protectedRoute, deleteItem);
router.route('/budget/:end/:start/:year/:month/:currency').get(protectedRoute, getBudget);

module.exports = router;