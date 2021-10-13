const Budget = require('../models/Budget');
const {sendEmail} = require('./mailerService');
const ErrorService = require('../services/errorService');

const resJsonMessage = (res, data, statusCode) => {
   res.status(statusCode).json({data, success: true});
};

const resJsonData = async (req, res, statusCode) => {
    let user_id = req.user._id;
    let data = await Budget.find({user_id});
    res.status(statusCode).json({data, user_id, success: true});
};

const sendToken = (res, user, statusCode) => {
    let token = user.getSignedJwtToken();
    res.status(statusCode).json({token, success: true});
};

const complexSendData = async (res, user, message, next, token) => {
    try {
        let data = token ? [token, await sendEmail(message)] : await sendEmail(message);
        resJsonMessage(res, data, 200);
    } catch (err) {
        user.token = undefined;
        user.tokenExpire = undefined;
        user.tokenForVerifyEmail = undefined;
        user.expireTokenForVerifyEmail = undefined;
        await user.save();

        return next(new ErrorService('The email could not be sent', 500));
    }
};

module.exports = {sendToken, resJsonData, resJsonMessage, complexSendData}