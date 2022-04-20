const data = require('../data/data');
const User = require('../models/User');
const Budget = require('../models/Budget');
const ErrorService = require('../services/errorService');
const {sendToken, complexSendData} = require('../services/sendDataService');

const login = async (req, res, next) => {
    let {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    if (email === 'example@mail.com') {
        let user = await User.findOne({email: email});
        await Budget.deleteMany({user_id: user._id});
        await Budget.insertMany(data(user._id));
    }

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

    try {
        sendToken(res, user, 200);
    } catch (err) {
        return next(err);
    }
};

const register = async (req, res, next) => {
    let {name, email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorService('Please provide an email and password', 400));
    }

    if (await User.findOne({email})) {
        return next(new ErrorService('Email address already registered', 401));   
    }

    await User.create({name, email, password});

    let user = await User.findOne({email});

    if (!user) {
        return next(new ErrorService('User is not found', 401));
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
           <h3>Hello ${name}</h3>
           <p>Thank you for registering in our application. Very grateful! The final step lies ahead ...</p>
           <p>To activate your account, follow this link: 
           <a target="_" href=${url}>${url}</a>
           </p>
           <p>Best wishes</p>
           <p>Your development team</p>
        `
    };

    try {
        await complexSendData(res, user, message, next, verifyEmailToken);
    } catch(err) {
        return next(err);
    }
};

module.exports = {login, register};