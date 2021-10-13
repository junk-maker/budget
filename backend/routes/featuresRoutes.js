const {getFeatures} = require('../controller/featuresController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/features').get(protectedRoute, getFeatures);

module.exports = router;