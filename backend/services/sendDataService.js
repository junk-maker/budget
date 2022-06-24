const Budget = require('../models/Budget');
const {sendEmail} = require('./mailerService');
const ErrorService = require('../services/errorService');

const sendToken = (res, user, statusCode) => {
    let token = user.getSignedJwtToken();
    res.status(statusCode).json({token, success: true});
};

const jsonResponseMessage = (res, data, statusCode) => {
   res.status(statusCode).json({data, success: true});
};

const jsonResponseData = async (req, res, statusCode) => {
    const {end, start, year, type, month, currency} = req.params;
    console.log(req.params)
    let db = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
        ? await Budget.find({user_id: req.user._id, 'currency.currency': currency})
        : await Budget.find({user_id: req.user._id, 'currency.currency': currency, date: {$gte: new Date(start), $lte: new Date(end)}})
    ;
    let data = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
        ? db.filter(val => type === 'DoubleBarChart' || type === 'BalanceBarChart' ? new Date(val.date).getFullYear() === +year : (new Date(val.date).getMonth() === +month) && (new Date(val.date).getFullYear() === +year))
        : db
    ;
    console.log(data)
    res.status(statusCode).json({data, success: true});
};

const complexResponseData = async (res, user, message, next, token) => {
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
    };
};

module.exports = {sendToken, jsonResponseData, jsonResponseMessage, complexResponseData}