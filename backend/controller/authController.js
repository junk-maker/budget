const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {sendToken, complexSendData} = require('../services/sendDataService');

const login = async (req, res, next) => {
    let {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    try {
        // Check that user exists by email
        let user = await User.findOne({email}).select('+password');

        if (!user) {
            return next(new ErrorService('Email not found', 401));
        }

        // Check email confirmation
        if (user.pending === true) {
            return next(new ErrorService('Please confirm your email', 401));
        }

        // Check that password match
        let isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorService('Password not found', 401));
        }

        user.token = undefined;
        user.tokenExpire = undefined;
        user.tokenForVerifyEmail = undefined;
        user.expireTokenForVerifyEmail = undefined;
        await user.save();

        sendToken(res, user,200);
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    let {name, email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    try {
        await User.create({name, email, password});

         try {
             let user = await User.findOne({email});

             if (!user) {
                 return next(new ErrorService('User is not found', 404));
             }

             // Reset Token Gen and add to database hashed (private) version of token
             let token= user.getToken();
             let verifyEmailToken = user.getVerifyEmailToken();

             await user.save();

             let url = `${process.env.DOMAIN}activate-email/${token}`;

             let message = {
                 from: process.env.MAIL_FROM,
                 to: process.env.MAIL_TO,
                 subject: `Message from ${email}`,
                 html: `
                    <h3>Привет ${name}</h3>
                    <p>Спасибо за регистрацию в нашем приложении. Очень признателен! Впереди вас ждет последний шаг ...</p>
                    <p>Чтобы активировать свою учетную запись, перейдите по этой ссылке: 
                    <a target="_" href=${url}>${url}</a>
                    </p>
                    <p>С уважением</p>
                    <p>Ваша команда разработчиков</p>
                 `
             };

             await complexSendData(res, user, message, next, verifyEmailToken);
         } catch (err) {
             next(err);
         }
    } catch (err) {
        next(err);
    }
};

module.exports = {login, register};