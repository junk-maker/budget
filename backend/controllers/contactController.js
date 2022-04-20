const {sendEmail} = require('../services/mailerService');
const ErrorService = require('../services/errorService');
const {resJsonMessage} = require('../services/sendDataService');

const getMessage = (req, res, next) => {
    try {
        resJsonMessage(res, 'Connect has been initialized', 200);
    } catch (err) {
        return next(err);
    }
};

const sendMessage = async (req, res, next) => {
    let message = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    };

    try {
        resJsonMessage(res, await sendEmail(message), 200);
    } catch (err) {
        return next(new ErrorService('The email could not be sent', 500));
    }
};

module.exports = {getMessage, sendMessage};