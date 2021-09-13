const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {resJsonMessage} = require('../services/sendDataService');


const getSettings = async (req, res, next) => {
    let settings = 'Connect has been initialized';
    try {
        resJsonMessage(res, settings, 200);
    } catch (err) {
        return next(err);
    }
};

const changeEmail = async (req, res, next) => {
    let {email} = req.body;

    try {
        let user = await User.findOne({email: req.user.email});

        if (!user) {
            return next(new ErrorService('User not found', 404));
        }

        user.email = email;

        await user.save();

        let data = 'Email updated success';

        resJsonMessage(res, data, 201);
    } catch (err) {
        return next(err);
    }
};

const changePassword = async (req, res, next) => {
    let {password, newPassword, confirmPassword} = req.body;

    let user = await User.findOne({email: req.user.email}).select('+password');

    let isMatch = await user.matchPassword(password);

    console.log(isMatch, 'm')

    if (!isMatch) {
        return next(new ErrorService('Password not found', 401));
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorService('Password do not match', 401));
    }

    user.password = newPassword;

    await user.save();

    let data = 'Password updated success';

    resJsonMessage(res, data, 201);
};

const deleteAccount = async (req, res, next) => {
    console.log(req.body)
};


module.exports = {getSettings, changeEmail, changePassword, deleteAccount};