const User = require('../models/User');
const ErrorService = require('../services/errorService');
const {complexResponseData} = require('../services/sendDataService');

const passwordRecovery = async (req, res, next) => {
    const {email} = req.body;
    let user = await User.findOne({email});

    if (!user) {
        return next(new ErrorService('User is not found', 401));
    };

    if (email === 'example@mail.com') {
        return next(new ErrorService('Not enough rights', 401));
    };


    let token = user.getToken();
    await user.save();

    // Create reset url to email to provided email
    let url = `${process.env.DOMAIN}reset-password/${token}`;

    let message = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `Message from ${email}`,
        html: `
            <h1>You requested a password reset</h1>
            <p>Please make a request for placement at the following link:</p>
            <a href=${url}>${url}</a>
        `
    };

    try {
        await complexResponseData(res, user, message, next, null);
    } catch (err) {
        return next(err);
    };
};

module.exports = {passwordRecovery};