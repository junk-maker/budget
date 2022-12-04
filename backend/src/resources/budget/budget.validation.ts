import {Types} from 'mongoose';
import UserModel from '@/resources/user/user.model';
import BudgetModel from '@/resources/budget/budget.model';

class BudgetValidation {
    private user = UserModel;
    private budget = BudgetModel;

    public async changeEmail(email: string, userEmail: string): Promise<void> {
        if (!email) {
            throw new Error('Please specify your email address');
        };
    
        if (email === 'example@mail.com') {
            throw new Error('Not enough rights');
        };

        let user = await this.user.findOne({email: userEmail});

        if (!user) {
            throw new Error('User not found');
        };

        user.email = email;

        await user.save();
    };

    public async changePassword(password: string, newPassword: string, confirmPassword: string, userEmail: string): Promise<void> {
        if (!password || !newPassword || !confirmPassword) {
            throw new Error('Please provide the data');
        };

        if (password === '@example') {
            throw new Error('Not enough rights');
        };

        if (newPassword !== confirmPassword) {
            throw new Error('Password does not match');
        };

        let user = await this.user.findOne({email: userEmail});

        if (!user) {
            throw new Error('User not found');
        };

        if (!await user.matchPassword(password)) {
            throw new Error('Password not found');
        };

        user.password = newPassword;

        await user.save();
    };

    public async deleteAccount(password: string, userEmail: string): Promise<void> {
        if (!password) {
            throw new Error('Please provide password');
        };

        if (password === '@example') {
            throw new Error('Not enough rights');
        };

        let user = await this.user.findOne({email: userEmail});

        if (!user) {
            throw new Error('User not found');
        };

        if (!await user.matchPassword(password)) {
            throw new Error('Password not found');
        };

        await user.remove();
        await this.budget.deleteMany({user_id: user._id});
    };

    public sendMessage(email: string, message: string): void {
        if (!email || !message) {
            throw new Error('Please provide an email address and a message');
        };
    };

    public async addItem(user_id: Types.ObjectId, value: string, amount: string, currency: string, category: string, description: string): Promise<void> {
        if (!value || !amount || !currency || !category || !description) {
            throw new Error('Please provide the data');
        };

        if (!user_id) {
            throw new Error('User not found');
        };

        await this.budget.create({user_id, value, amount, currency, category, description});
    };

    public async editItem(id: string, value: string, amount: string, currency: string, category: string, description: string): Promise<void> {
        if (!id || !value || !amount || !currency || !category || !description) {
            throw new Error('Please provide the data');
        };

        let options = {new: true};
        let edit = {id, value, amount, currency, category, description};

        await this.budget.findByIdAndUpdate(id, edit, options).exec();
    };

    public async deleteItem(id: string): Promise<void> {
        if (!id) {
            throw new Error('Please provide an ID');
        };

        await this.budget.findByIdAndDelete(id).exec();
    };
};

export default BudgetValidation;