import {Request, Response, NextFunction} from 'express';
import HttpException from '@/utils/exeptions/http.exeption';
import statusCode from '../utils/services/status.code.service';

function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction): void {
    let error = {...err};
    error.message = err.message;
    
    res.status(error.statusCode || statusCode(error.message)).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

export default errorMiddleware;