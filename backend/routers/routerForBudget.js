const {addItem, editItem, getBudget, deleteItem} = require('../controllers/budgetController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/budget/:end/:year/:start/:month/:currency').put(protectedRoute, editItem);
router.route('/budget/:end/:year/:start/:month/:currency').post(protectedRoute, addItem);
router.route('/budget/:end/:year/:start/:month/:currency').get(protectedRoute, getBudget);
router.route('/budget/:id/:end/:year/:start/:month/:currency').delete(protectedRoute, deleteItem);

module.exports = router;