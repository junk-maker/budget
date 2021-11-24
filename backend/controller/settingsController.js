const User = require('../models/User');
const Budget = require('../models/Budget');
const ErrorService = require('../services/errorService');
const {resJsonMessage} = require('../services/sendDataService');


const getSettings = async (req, res, next) => {
    try {
        resJsonMessage(res, 'Connect has been initialized', 200);
    } catch (err) {
        return next(err);
    }
};

const changeEmail = async (req, res, next) => {
    let {email} = req.body;

    let user = await User.findOne({email: req.user.email});

    if (!user) {
        return next(new ErrorService('User not found', 401));
    }

    try {
        user.email = email;
        await user.save();
        resJsonMessage(res, 'Email updated success', 201);
    } catch (err) {
        return next(err);
    }
};

const changePassword = async (req, res, next) => {
    let {password, newPassword, confirmPassword} = req.body;
    let user = await User.findOne({email: req.user.email}).select('+password');
    let isMatch = await user.matchPassword(password);

    if (!user) {
        return next(new ErrorService('User not found', 401));
    }

    if (!isMatch) {
        return next(new ErrorService('Password not found', 401));
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorService('Password do not match', 400));
    }

    try {
        user.password = newPassword;
        await user.save();
        resJsonMessage(res, 'Password updated success', 201);
    } catch (err) {
        return next(err);
    }
};

const deleteAccount = async (req, res, next) => {
    let {password} = req.body;
    let user = await User.findOne({email: req.user.email}).select('+password');
    let isMatch = await user.matchPassword(password);

    if (!user) {
        return next(new ErrorService('User not found', 401));
    }

    if (password === '@example') {
        return next(new ErrorService('Not enough rights', 401));
    }

    if (!isMatch) {
        return next(new ErrorService('Password not found', 401));
    }

    if (!password) {
        return next(new ErrorService('Please provide password', 400));
    }

    try {
        await user.remove();
        await Budget.deleteMany({user_id: user._id});
        resJsonMessage(res, 'Account successfully deleted', 201);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getSettings, changeEmail, changePassword, deleteAccount};