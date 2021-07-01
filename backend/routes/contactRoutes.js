const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getMessage, sendMessage} = require('../controller/contactController');


router.route('/contact').get(protectedRoute, getMessage);
router.route('/contact').post(protectedRoute, sendMessage);


module.exports = router;