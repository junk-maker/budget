import express from 'express';
import {AppErrorHandler} from '../interfaces/interfaces';

class ErrorHandler {
    getError(err: AppErrorHandler, req: express.Request, res: express.Response, next: express.NextFunction) {
        let error = {...err};

        error.message = err.message;
    
        console.log(error.message, 'err');
    
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });
    };
};

export default new ErrorHandler();