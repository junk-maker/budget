import UserModel from '@/resources/user/user.model';
import {Request, Response, NextFunction} from 'express';
import TokenService from '@/utils/services/token.service';
import HttpException from '@/utils/exeptions/http.exeption';

function protectedRoute() {
   return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        };

        if (!token) {
            return next(new HttpException('Not authorized to access this route', 401));
        };

        try {
            let decoded = await TokenService.verifyToken(token);

            let user = await UserModel.findById(decoded.id);

            if (!user) {
                return next(new HttpException('The user with this ID was not found', 404));
            };

            req.user = user;

            next();
        } catch (err) {
            return next(new HttpException('Not authorized to access this router', 401));
        };
   };
};

export default protectedRoute;