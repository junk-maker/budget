const {getStatistics} = require('../controllers/statisticsController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/statistics/:currency').get(protectedRoute, getStatistics);

module.exports = router;