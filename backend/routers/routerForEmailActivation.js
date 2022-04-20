const {emailActivation} = require('../controllers/emailActivationController');
const express = require('express');
const router = express.Router();

router.route('/email-activation/:token').get(emailActivation);

module.exports = router;