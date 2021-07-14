const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {sendEmail} = require('../services/mailerService');
const {resJsonMessage} = require('../services/helperService');


const recoverPassword = async (req, res, next) => {
    let {email} = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return next(new ErrorService('User is not found', 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        let resetToken = user.getResetPasswordToken();

        await user.save();

        // Create reset url to email to provided email
        let resetUrl = `${process.env.DOMAIN}reset-password/${resetToken}`;

        let message = {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: `Message from ${email}`,
            html: `
                <h1>Вы запросили сброс пароля</h1>
                <p>Пожалуйста, сделайте запрос на размещение по следующей ссылке:</p>
                <a href=${resetUrl}>${resetUrl}</a>
            `
        };

        try {
            let data = await sendEmail(message);
            resJsonMessage(res, data, 200);
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorService('Email could not be sent', 500));
        }
    } catch (err) {
        next(err);
    }
};


module.exports = {recoverPassword};