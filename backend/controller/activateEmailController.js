const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {resJsonMessage} = require('../services/sendDataService');

const activateEmail = async (req, res, next) => {
    // Compare token in URL params to hashed token
    let token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    let user = await User.findOne({
        token,
        tokenExpire: {$gt: Date.now()},
    });

    try {
        if (!user) {
            next(new ErrorService('Invalid request', 400));
        } else {
            user.pending = false;
            user.token = undefined;
            user.tokenExpire = undefined;
            await user.save();

            let data = 'Email activated successfully';
            resJsonMessage(res, data, 201);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {activateEmail};