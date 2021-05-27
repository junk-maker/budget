const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');


const login = async (req, res, next) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    try {
        // Check that user exists by email
        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return next(new ErrorService('Email not found', 401));
        }

        // Check that password match
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorService('Password not found', 401));
        }

        sendToken(res, user,200);
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    try {
        const user = await User.create({name, email, password});

        sendToken(res, user,200);
    } catch (err) {
        next(err);
    }
};


const verifyEmail = (req, res, next) => {};


const resetPassword = async (req, res, next) => {};

const recoverPassword = async (req, res, next) => {};

const sendToken = (res, user, statusCode) => {
    const id = user._id;
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({id, token, success: true});
};

module.exports = {login, register,verifyEmail, resetPassword, recoverPassword};