const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {complexSendData} = require('../services/sendDataService');

const recoverPassword = async (req, res, next) => {
    let {email} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return next(new ErrorService('User is not found', 404));
        }

        let token = user.getToken();

        await user.save();

        // Create reset url to email to provided email
        let url = `${process.env.DOMAIN}reset-password/${token}`;

        let message = {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Message from ${email}`,
            html: `
                <h1>Вы запросили сброс пароля</h1>
                <p>Пожалуйста, сделайте запрос на размещение по следующей ссылке:</p>
                <a href=${url}>${url}</a>
            `
        };

        await complexSendData(res, user, message, next, null);
    } catch (err) {
        next(err);
    }
};

module.exports = {recoverPassword};