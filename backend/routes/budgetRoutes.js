const express = require('express');
const router = express.Router();
const getBudget = require('../controller/budgetControllers');

router.get('/', getBudget);

module.exports = router;