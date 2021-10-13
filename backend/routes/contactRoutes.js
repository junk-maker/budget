const {getMessage, sendMessage} = require('../controller/contactController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/contact').get(protectedRoute, getMessage);
router.route('/contact').post(protectedRoute, sendMessage);

module.exports = router;