const crypto = require('crypto');
const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {sendEmail} = require('../services/mailerService');
const {resJsonMessage} = require('../services/sendDataService');

const getVerify = async (req, res, next) => {
    let data = 'Connect has been initialized';

    // Compare token in URL params to hashed token
    let tokenForVerifyEmail = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    let user = await User.findOne({
        tokenForVerifyEmail,
        expireTokenForVerifyEmail: {$gt: Date.now()},
    });

    try {
        if (!user) {
            next(new ErrorService('Invalid request', 400));
        } else {
            resJsonMessage(res, data, 200);
        }
    } catch (err) {
        next(err);
    }
};

const getVerifyEmail = async (req, res, next) => {
    // Compare token in URL params to hashed token
    let tokenForVerifyEmail = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex');

    let user = await User.findOne({
        tokenForVerifyEmail,
        expireTokenForVerifyEmail: {$gt: Date.now()},
    })

    try {
        if (!user) {
            next(new ErrorService('Invalid request', 400));
        } else {
            // Reset Token Gen and add to database hashed (private) version of token
            let token= user.getToken();
            await user.save();

            let url = `${process.env.DOMAIN}activate-email/${token}`;

            let message = {
                from: process.env.MAIL_FROM,
                to: process.env.MAIL_TO,
                subject: `Message from ${user.email}`,
                html: `
                    <p>Повторная отправка сообщения для активации</p>
                    <p>Чтобы активировать свою учетную запись, перейдите по этой ссылке:  
                    <a target="_" href=${url}>${url}</a
                    </p>
                    <p>С уважением</p>
                    <p>Ваша команда разработчиков</p>
                `
            };

            let data = await sendEmail(message);
            resJsonMessage(res, data, 200);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {getVerify, getVerifyEmail}