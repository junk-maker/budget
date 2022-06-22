const {addItem, editItem, getBudget, deleteItem} = require('../controllers/budgetController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget/:end/:start/:year/:month/:currency').put(protectedRoute, editItem);
router.route('/budget/:end/:start/:year/:month/:currency').post(protectedRoute, addItem);
router.route('/budget/:end/:start/:year/:month/:currency').get(protectedRoute, getBudget);
router.route('/budget/:id/:end/:start/:year/:month/:currency').delete(protectedRoute, deleteItem);

module.exports = router;