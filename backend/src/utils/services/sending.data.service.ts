import UserModel from '@/resources/user/user.model';
import {Request, Response, NextFunction} from 'express';
import BudgetModel from '@/resources/budget/budget.model';
import EmailService from '@/utils/services/email.service';
import HttpException from '@/utils/exeptions/http.exeption';
import EmailOptions from '@/utils/interfaces/email.interface';

class SendingDataService {
    private user = UserModel;
    private budget = BudgetModel;
    private emailService = new EmailService();

    sendToken(res: Response, token: string, status: number): void {
        res.status(status).json({token, success: true});
    };

    jsonResponseMessage(res: Response, data: void | string | (string | void)[], status: number): void {
        res.status(status).json({data, success: true});
    };

    async jsonResponseData(req: Request, res: Response, status: number): Promise<void> {
        const {end, year, start, month, value, currency} = req.params;

        let db = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
            ? await this.budget.find({user_id: req.user._id, 'currency.currency': currency})
            : await this.budget.find({user_id: req.user._id, 'currency.currency': currency, date: {$gte: new Date(start), $lte: new Date(end)}})
        ;
        let data = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined') 
            ? db.filter(val => value === 'DoubleBarChart' || value === 'BalanceBarChart' ? new Date(val.date).getFullYear() === +year : (new Date(val.date).getMonth() === +month) && (new Date(val.date).getFullYear() === +year))
            : db
        ;

        res.status(status).json({data, success: true});
    };

    async complexResponseData(email: string, opts: EmailOptions, token: string | null, res: Response, next: NextFunction): Promise<void> {
        let user = await this.user.findOne({email});

        if (!user) {
            return next(new HttpException('User not found', 401));
        };

        try {
            let message = await this.emailService.sendingEmail(opts);
            let data = token ? [token, message] : message;
            console.log(data)

            this.jsonResponseMessage(res, data, 200);
        } catch (err) {
            user.token = undefined;
            user.tokenExpire = undefined;
            user.tokenForVerifyEmail = undefined;
            user.expireTokenForVerifyEmail = undefined;
            await user.save();
    
            return next(new HttpException('The email could not be sent', 500));
        };
    };
};

export default SendingDataService;