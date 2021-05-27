const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorService = require('../services/errorService');


exports.protectedRoute = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorService('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        console.log(user)

        if (!user) {
            return next(new ErrorService('No user found with this id', 404));
        }

        req.user = user;

        next();
    } catch (err) {
        return next(new ErrorService('Not authorized to access this router', 401));
    }
};