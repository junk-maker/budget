import {data} from '@/utils/services/budget.data';
import UserModel from '@/resources/user/user.model';
import TokenService from '@/utils/services/token.service';
import BudgetModel from '@/resources/budget/budget.model';
import {TokenForRegister, TokenForVerifyEmail} from '@/resources/user/user.validation.interface';

class UserValidation {
    private user = UserModel;
    private budget = BudgetModel;

    public async register(name: string, email: string, password: string): Promise<TokenForRegister> {
        if (!email || !password) {
            throw new Error('Please provide your email address and password');
        };

        if (await this.user.findOne({email})) {
            throw new Error('Email address already registered');
        };

        await this.user.create({name, email, password});

        let user = await this.user.findOne({email});

        if (!user) {
            throw new Error('User not found');
        };

        // Reset Token Gen and add to database hashed (private) version of token
        let token = user.getToken();
        let verifyEmailToken = user.getVerifyEmailToken();

        await user.save();

        let tokenForRegister: TokenForRegister = {
            token,
            verifyEmailToken,
        };

        return tokenForRegister;
    };

    public async login(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new Error('Please provide your email address and password');
        };

        let user = await this.user.findOne({email}).select('+password');

        if (!user) {
            throw new Error('Email not found');
        };

        // Check email confirmation
        if (user.pending === true) {
            throw new Error('Please confirm your email address');
        };

        // Check that password match
        if (!await user.matchPassword(password)) {
            throw new Error('Password not found');
        } else {
            if (email === 'example@mail.com') {
                await this.budget.deleteMany({user_id: user._id!});
                await this.budget.insertMany(data(user._id!));
            };
            let token = user.getSignedJwtToken();
            return token;
        };
    };

    public async emailActivation(token: string): Promise<void> {
        if (!token) {
            throw new Error('Please provide a TOKEN');
        };

        let comparedToken = this.comparedToken(token);

        let user = await this.user.findOne({
            token: comparedToken,
            tokenExpire: {$gt: Date.now()},
        });
    
        if (!user) {
            throw new Error('Invalid request');
        } else {
            user.pending = false;
            user.token = undefined;
            user.tokenExpire = undefined;
            user.tokenForVerifyEmail = undefined;
            user.expireTokenForVerifyEmail = undefined;
            await user.save();
        };
    };

    public async passwordRecovery(email: string): Promise<string> {
        if (email === 'example@mail.com') {
            throw new Error('Not enough rights');
        };

        let user = await this.user.findOne({email});

        if (!user) {
            throw new Error('User not found');
        };

        let token = user.getToken();
        await user.save();
        
        return token;
    };

    public async passwordReset(token: string, password: string, confirmPassword: string): Promise<void> {
        if(password !== confirmPassword) {
            throw new Error('Password does not match');
        };

        let comparedToken = this.comparedToken(token);

        let user = await this.user.findOne({
            token: comparedToken,
            tokenExpire: {$gt: Date.now()}
        });
    
        if (!user) {
            throw new Error('Invalid request');
        } else {
            user.password = password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
        };
    };

    public async getVerify(token: string): Promise<void> {
        let comparedToken = this.comparedToken(token);

        let user = await this.user.findOne({
            tokenForVerifyEmail: comparedToken,
            expireTokenForVerifyEmail: {$gt: Date.now()},
        });
    
        if (!user) {
            throw new Error('Invalid request');
        };
    };

    public async getVerifyEmail(token: string): Promise<TokenForVerifyEmail> {
        let comparedToken = this.comparedToken(token);

        let user = await this.user.findOne({
            tokenForVerifyEmail: comparedToken,
            expireTokenForVerifyEmail: {$gt: Date.now()},
        });

        if (!user) {
            throw new Error('Invalid request');
        };

        // Reset Token Gen and add to database hashed (private) version of token
        let getToken = user.getToken();

        await user.save();

        let tokenForVerifyEmail: TokenForVerifyEmail = {
            token: getToken,
            email: user.email,
        };

        return tokenForVerifyEmail;
    };

    public getUrl(token: string): string {
        return `${process.env.DOMAIN}${token}`
    };

    private comparedToken(token: string): string {
        return TokenService.compareToken(token);
    };
    
};

export default UserValidation;