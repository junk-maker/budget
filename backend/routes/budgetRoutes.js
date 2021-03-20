const express = require('express');
const router = express.Router();
const {getBudget, getBudgetByValue} = require('../controller/budgetControllers');

router.get('/', getBudget);
router.get('/:value', getBudgetByValue);

module.exports = router;