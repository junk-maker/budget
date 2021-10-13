const {activateEmail} = require('../controller/activateEmailController');
const express = require('express');
const router = express.Router();

router.route('/activate-email/:token').get(activateEmail);

module.exports = router;