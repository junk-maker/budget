const {getSettings, changeEmail, changePassword, deleteAccount} = require('../controller/settingsController');
const {protectedRoute} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.route('/settings/:list').get(protectedRoute, getSettings);
router.route('/settings/change-email').put(protectedRoute, changeEmail);
router.route('/settings/change-password').put(protectedRoute, changePassword);
router.route('/settings/delete-account').delete(protectedRoute, deleteAccount);

module.exports = router;