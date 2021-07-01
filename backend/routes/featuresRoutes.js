const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getFeatures} = require('../controller/featuresController');

router.route('/features').get(protectedRoute, getFeatures);

module.exports = router;