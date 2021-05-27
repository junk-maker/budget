const {login, register, resetPassword, recoverPassword} = require('../controller/authController');
const express = require('express');
const router = express.Router();


router.route('/sign-in').post(login);
router.route('/sign-up').post(register);
router.route('/help').post(recoverPassword);
router.route('/settings').post(resetPassword);


module.exports = router;