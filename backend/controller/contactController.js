const {resJsonMessage} = require('../services/helperService');
const {sendContactForm} = require('../services/mailerService');


const sendMessage = async (req, res, next) => {
    let data = await sendContactForm(req);
    try {
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