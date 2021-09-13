const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getStatistic} = require('../controller/statisticController');


router.route('/statistic').get(protectedRoute, getStatistic);


module.exports = router;