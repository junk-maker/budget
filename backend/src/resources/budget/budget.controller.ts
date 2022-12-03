import EmailService from '@/utils/services/email.service';
import protectedRoute from '@/middleware/protected.route';
import HttpException from '@/utils/exeptions/http.exeption';
import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import BudgetValidation from '@/resources/budget/budget.validation';
import SendingDataService from '@/utils/services/sending.data.service';

class BudgetController implements Controller {
    public path = '/budget';
    public router = Router();
    private protected = protectedRoute;
    private EmailService = new EmailService();
    private BudgetValidation = new BudgetValidation();
    private SendingDataService = new SendingDataService();

    constructor() {
        this.routes();
    };
    
    private routes(): void {
        this.router.get(`${this.path}/contact`, this.protected(), this.getMessage);
        this.router.post(`${this.path}/contact`, this.protected(), this.sendMessage);
        this.router.get(`${this.path}/features`,  this.protected(), this.getFeatures);
        this.router.get(`${this.path}/settings/:list`, this.protected(), this.getSettings);
        this.router.put(`${this.path}/settings/change-email`, this.protected(), this.changeEmail);
        this.router.put(`${this.path}/settings/change-password`, this.protected(), this.changePassword);
        this.router.delete(`${this.path}/settings/delete-account`, this.protected(), this.deleteAccount);
        this.router.put(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.editItem);
        this.router.post(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.addItem);
        this.router.get(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.getBudget);
        this.router.delete(`${this.path}/budget/:id/:end/:year/:start/:month/:currency`, this.protected(), this.deleteItem);
        this.router.get(`${this.path}/statistics/:end/:year/:start/:month/:value/:currency`, this.protected(), this.getStatistics);
    };

    private getFeatures = (req: Request, res: Response, next: NextFunction): void => {
        try {
            this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        } catch (err) {
            return next(err);
        };
    };

    private getStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.SendingDataService.jsonResponseData(req, res, 200);
        } catch (err) {
            return next(err);
        };
    };

    private getSettings = (req: Request, res: Response, next: NextFunction): void => {
        try {
            this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        } catch (err) {
            return next(err);
        };
    };

    private changeEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email} = req.body;
    
        try {
            await this.BudgetValidation.changeEmail(email, req.user.email);
            this.SendingDataService.jsonResponseMessage(res, 'Email updated success', 201);
        } catch (err) {
            return next(err);
        };
    };

    private changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {password, newPassword, confirmPassword} = req.body;

        try {
            await this.BudgetValidation.changePassword(password, newPassword, confirmPassword, req.user.email);
            this.SendingDataService.jsonResponseMessage(res, 'Password updated success', 201);
        } catch (err) {
            return next(err);
        };
    };

    private deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {password} = req.body;
        try {

            await this.BudgetValidation.deleteAccount(password, req.user.email);
            this.SendingDataService.jsonResponseMessage(res, 'Account successfully deleted', 201);
        } catch (err) {
            return next(err);
        };
    };

    private getMessage = (req: Request, res: Response, next: NextFunction): void => {
        try {
            this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        } catch (err) {
            return next(err);
        };
    };

    private sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email, message} = req.body;
    
        try {
            this.BudgetValidation.sendMessage(email, message);

            let opts = {
                email,
                text: message,
                type: 'send-message',
            };
            this.SendingDataService.jsonResponseMessage(res, await this.EmailService.sendingEmail(opts), 200);
        } catch (err) {
            return next(new HttpException('The email could not be sent', 500));
        };
    };

    private getBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await this.SendingDataService.jsonResponseData(req, res, 200);
        } catch (err) {
            return next(err);
        };
    };

    private addItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user_id = req.user._id;
        const {value, amount, currency, category, description} = req.body;

        try {
            await this.BudgetValidation.addItem(user_id, value, amount, currency, category, description);
            await this.SendingDataService.jsonResponseData(req, res, 201);
        } catch (err) {
            return next(err);
        };
    };

    private editItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {id, value, amount, currency, category, description} = req.body;

        try {
            await this.BudgetValidation.editItem(id, value, amount, currency, category, description);
            await this.SendingDataService.jsonResponseData(req, res, 201);
        } catch (err) {
            return next(err);
        };
    };

    private deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {id} = req.params;;

        try {
            await this.BudgetValidation.deleteItem(id);
            await this.SendingDataService.jsonResponseData(req, res, 201);
        } catch (err) {
            return next(err);
        };
    };
};

export default BudgetController;