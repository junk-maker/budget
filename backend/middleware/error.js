const ErrorService = require('../services/errorService');


const errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;

    if (err.code === 11000) {
        const message = 'Email address already registered';
        error = new ErrorService(message, 400);
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorService(message, 400);
    }

    console.log(error.message, 'err');

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};


module.exports = errorHandler;