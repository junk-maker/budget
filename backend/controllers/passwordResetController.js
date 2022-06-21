const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {jsonResponseMessage} = require('../services/sendDataService');


const passwordReset = async (req, res, next) => {
    const {password, confirmPassword} = req.body;

    if(password !== confirmPassword) {
        return next(new ErrorService('Password do not match', 400));
    };

    // Compare token in URL params to hashed token
    let token = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')
    ;

    let user = await User.findOne({
        token,
        tokenExpire: {$gt: Date.now()}
    });

    if (!user) {
        next(new ErrorService('Invalid request', 401));
    };
    
    try {
        if (user) {
            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            jsonResponseMessage(res, 'Password updated success', 201);   
        };
        
    } catch (err) {
        return next(err);
    };
};

module.exports = {passwordReset};