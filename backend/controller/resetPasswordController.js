const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {resJsonMessage} = require('../services/sendDataService');


const resetPassword = async (req, res, next) => {
    let {password, confirmPassword} = req.body;

    if(password !== confirmPassword) {
        return next(new ErrorService('Password do not match', 400));
    }

    // Compare token in URL params to hashed token
    let token = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');


    try {
        let user = await User.findOne({
            token,
            tokenExpire: {$gt: Date.now()},
        });

        if (!user) {
            next(new ErrorService('Invalid request', 400));
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        let data = 'Password updated success';
        resJsonMessage(res, data, 201);
    } catch (err) {
        next(err);
    }
};

module.exports = {resetPassword};