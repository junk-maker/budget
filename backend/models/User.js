const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide username'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email address'],
        match: [
            /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[A-Z]{2}|ru|com|org|net)\b/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        required: [true, 'Please provide password'],
    },
    pending: {
        type: Boolean,
        unique: false,
        default: true,
    },
    token: String,
    tokenExpire: Date,
    tokenForVerifyEmail: String,
    expireTokenForVerifyEmail : Date
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Token for local storage
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Reset token and add to database hashed (private) version of token
UserSchema.methods.getToken = function () {
    const token = crypto.randomBytes(20).toString('hex');

    // Hash token (private key) and save to database
    this.token = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Set token expire date
    this.tokenExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

    return token;
};

UserSchema.methods.getVerifyEmailToken = function () {
    const token = crypto.randomBytes(20).toString('hex');

    // Hash token (private key) and save to database
    this.tokenForVerifyEmail = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Set token expire date
    this.expireTokenForVerifyEmail = Date.now() + 10 * (30 * 1000); // 5 Minutes

    return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;