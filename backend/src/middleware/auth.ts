import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import ErrorService from '../services/errorService';

class ProtectedRoute {
    async getProtected(req: express.Request, res: express.Response, next: express.NextFunction) {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        };
    
        if (!token) {
            return next(new ErrorService('Not authorized to access this route', 401));
        };
    
        try {
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    
            const user = await User.findById(decoded);
            console.log(decoded)
    
            if (!user) {
                return next(new ErrorService('No user found with this id', 404));
            };
    
            req.user = user;
    
            next();
        } catch (err) {
            return next(new ErrorService('Not authorized to access this router', 401));
        };
    };
};

export default new ProtectedRoute();