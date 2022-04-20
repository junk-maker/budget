const {login, register} = require('../controllers/authController');
const express = require('express');
const router = express.Router();

router.route('/sign-in').post(login);
router.route('/sign-up').post(register);

module.exports = router;