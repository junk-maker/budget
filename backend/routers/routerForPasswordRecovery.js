const {passwordRecovery} = require('../controllers/passwordRecoveryController');
const express = require('express');
const router = express.Router();

router.route('/password-recovery').post(passwordRecovery);

module.exports = router;