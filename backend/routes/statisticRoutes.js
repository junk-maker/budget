const {getStatistic} = require('../controller/statisticController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/statistic').get(protectedRoute, getStatistic);

module.exports = router;