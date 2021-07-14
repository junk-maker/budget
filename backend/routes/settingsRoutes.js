const express = require('express');
const router = express.Router();
const {protectedRoute} = require('../middleware/auth');
const {getSettings, changeSettings, deleteAccount} = require('../controller/settingsController');


router.route('/settings').get(protectedRoute, getSettings);
router.route('/settings').put(protectedRoute, changeSettings);
router.route('/settings').delete(protectedRoute, deleteAccount);


module.exports = router;