import express from 'express';
import Budget from '../models/Budget';
import MailService from './mailerService';
import ErrorService from './errorService';
import {User} from '../interfaces/interfaces';

class SendDataService {
    sendToken(res: express.Response, token: string, statusCode: number) {
        // let token = user.getSignedJwtToken(); 
        res.status(statusCode).json({token, success: true});
    };

    jsonResponseMessage(res: express.Response, data: string, statusCode: number) {
        res.status(statusCode).json({data, success: true});
    };

    async jsonResponseData(req: express.Request, res: express.Response, statusCode: number) {
        const {end, year, start, month, value, currency} = req.params;

        let db = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
            ? await Budget.find({user_id: req.user._id, 'currency.currency': currency})
            : await Budget.find({user_id: req.user._id, 'currency.currency': currency, date: {$gte: new Date(start), $lte: new Date(end)}})
        ;
        let data = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
            ? db.filter(val => value === 'DoubleBarChart' || value === 'BalanceBarChart' ? new Date(val.date).getFullYear() === +year : (new Date(val.date).getMonth() === +month) && (new Date(val.date).getFullYear() === +year))
            : db
        ;

        res.status(statusCode).json({data, success: true});
    };

    async complexResponseData(user: User, token: string, res: express.Response, next: express.NextFunction) {
        // const {res, user, next, token, message} = data;

        try {
            // let data = token ? [token, await MailService.sendEmail(message)] : await MailService.sendEmail(message);
            // this.jsonResponseMessage(res, data, 200);
        } catch (err) {
            user.token = undefined;
            user.tokenExpire = undefined;
            user.tokenForVerifyEmail = undefined;
            user.expireTokenForVerifyEmail = undefined;
            await user.save();
    
            return next(new ErrorService('The email could not be sent', 500));
        };
        
    };
};

export default new SendDataService();