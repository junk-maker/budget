const {recoverPassword} = require('../controller/recoverPasswordController');
const express = require('express');
const router = express.Router();

router.route('/recover-password').post(recoverPassword);

module.exports = router;