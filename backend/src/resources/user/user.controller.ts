import EmailService from '@/utils/services/email.service';
import HttpException from '@/utils/exeptions/http.exeption';
import UserValidation from '@/resources/user/user.validation';
import {Router, Request, Response, NextFunction} from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import SendingDataService from '@/utils/services/sending.data.service';

class UserController implements Controller {
    public path = '/auth';
    public router = Router();
    private EmailService = new EmailService();
    private UserValidation = new UserValidation();
    private SendingDataService = new SendingDataService();

    constructor() {
        this.routes();
    };

    private routes(): void {
        this.router.post(`${this.path}/sign-in`, this.login);
        this.router.post(`${this.path}/sign-up`, this.register);
        this.router.get(`${this.path}/verify-email/:token`, this.getVerify);
        this.router.post(`${this.path}/verify-email/:token`, this.getVerifyEmail);
        this.router.post(`${this.path}/password-recovery`, this.passwordRecovery);
        this.router.get(`${this.path}/email-activation/:token`, this.emailActivation);
        this.router.put(`${this.path}/password-reset/:resetToken`, this.passwordReset);
    };

    private login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email, password} = req.body;
        
        try {   
            let response = await this.UserValidation.login(email, password);
            this.SendingDataService.sendToken(res, response, 200);
        } catch (err) {
            return next(err);
        };
    };

    private register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let {name, email, password} = req.body;

        try {
            let response = await this.UserValidation.register(name, email, password);

            let opts = {
                name,
                email,
                type: 'register',
                url: this.UserValidation.getUrl(`email-activation/${response.token}`),
            };
            await this.SendingDataService.complexResponseData(email, opts, response.verifyEmailToken, res, next);
        } catch(err) {
            return next(err);
        };
    };

    private emailActivation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {token} = req.params;

        try {
            await this.UserValidation.emailActivation(token);
            this.SendingDataService.jsonResponseMessage(res, 'Email activated successfully', 201);
        } catch(err) {
            return next(err);
        };
    };

    private passwordRecovery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email} = req.body;
    
        try {
            let response = this.UserValidation.passwordRecovery(email);

            let opts = {
                email,
                type: 'password-recovery',
                url: this.UserValidation.getUrl(`reset-password/${response}`),
            };
            
            await this.SendingDataService.complexResponseData(email, opts, null, res, next);
        } catch (err) {
            return next(err);
        };
    };

    private passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {resetToken} = req.params;
        const {password, confirmPassword} = req.body;

        try {
            await this.UserValidation.passwordReset(resetToken, password, confirmPassword);
            this.SendingDataService.jsonResponseMessage(res, 'Password updated success', 201);
        } catch (err) {
            return next(err);
        };
    };

    private getVerify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {token} = req.params;

        try {
            await this.UserValidation.getVerify(token);
            this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        } catch (err) {
            return next(err);
        };
    };

    private getVerifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {token} = req.body;

        try {
            let response = await this.UserValidation.getVerifyEmail(token);

            let opts = {
                type: 'verify-email',
                email: response.email,
                url: this.UserValidation.getUrl(`email-activation/${response.token}`),
            };
            
            this.SendingDataService.jsonResponseMessage(res, await this.EmailService.sendingEmail(opts), 200);  
        } catch (err) {
            return next(new HttpException('The email could not be sent', 500));
        };
    };
};

export default UserController;