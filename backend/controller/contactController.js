const {sendEmail} = require('../services/mailerService');
const {resJsonMessage} = require('../services/sendDataService');


const sendMessage = async (req, res, next) => {
    let message = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    };

    try {
        let data = await sendEmail(message);
        resJsonMessage(res, data, 200);
    } catch (err) {
        return next(err);
    }
};


const getMessage = (req, res, next) => {
    let data = 'Connect has been initialized';
    try {
        resJsonMessage(res, data, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {getMessage, sendMessage}