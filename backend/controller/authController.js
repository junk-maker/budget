const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {sendToken} = require('../services/helperService');


const login = async (req, res, next) => {
    let {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    try {
        // Check that user exists by email
        let user = await User.findOne({email}).select('+password');

        if (!user) {
            return next(new ErrorService('Email not found', 401));
        }

        // Check that password match
        let isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorService('Password not found', 401));
        }

        sendToken(res, user,200);
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    let {name, email, password} = req.body;

    try {
        let user = await User.create({name, email, password});

        sendToken(res, user,200);
    } catch (err) {
        next(err);
    }
};


module.exports = {login, register};