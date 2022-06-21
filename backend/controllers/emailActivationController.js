const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {jsonResponseMessage} = require('../services/sendDataService');

const emailActivation = async (req, res, next) => {
    // Compare token in URL params to hashed token
    let token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')
    ;

    let user = await User.findOne({
        token,
        tokenExpire: {$gt: Date.now()},
    });

    if (!user) {
        next(new ErrorService('Invalid request', 400));
    };

    try {
        if (user) {
            user.pending = false;
            user.token = undefined;
            user.tokenExpire = undefined;
            user.tokenForVerifyEmail = undefined;
            user.expireTokenForVerifyEmail = undefined;
            await user.save();
            jsonResponseMessage(res, 'Email activated successfully', 201);
        };
    } catch(err) {
        return next(err);
    };
};

module.exports = {emailActivation};