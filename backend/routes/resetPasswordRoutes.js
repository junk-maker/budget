const {resetPassword} = require('../controller/resetPasswordController');
const express = require('express');
const router = express.Router();

router.route('/reset-password/:resetToken').put(resetPassword);

module.exports = router;