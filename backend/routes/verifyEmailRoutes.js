const {getVerify, getVerifyEmail} = require('../controller/verifyEmailController');
const express = require('express');
const router = express.Router();

router.route('/verify-email/:token').get(getVerify);
router.route('/verify-email/:token').post(getVerifyEmail);

module.exports = router;