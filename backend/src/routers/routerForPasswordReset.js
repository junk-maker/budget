const {passwordReset} = require('../controllers/passwordResetController');
const express = require('express');
const router = express.Router();

router.route('/password-reset/:resetToken').put(passwordReset);

module.exports = router;