"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const budget_model_1 = __importDefault(require("@/resources/budget/budget.model"));
class BudgetValidation {
    constructor() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
    }
    changeEmail(email, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error('Please specify your email address');
            }
            ;
            let user = yield this.user.findOne({ email: userEmail });
            if (!user) {
                throw new Error('User not found');
            }
            ;
            if (user.email === 'example@mail.com') {
                throw new Error('Not enough rights');
            }
            ;
            user.email = email;
            yield user.save();
        });
    }
    ;
    changePassword(password, newPassword, confirmPassword, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password || !newPassword || !confirmPassword) {
                throw new Error('Please provide the data');
            }
            ;
            let user = yield this.user.findOne({ email: userEmail });
            if (!user) {
                throw new Error('User not found');
            }
            ;
            if (user.email === 'example@mail.com') {
                throw new Error('Not enough rights');
            }
            ;
            if (newPassword !== confirmPassword) {
                throw new Error('Password does not match');
            }
            ;
            if (!(yield user.matchPassword(password))) {
                throw new Error('Password not found');
            }
            ;
            user.password = newPassword;
            yield user.save();
        });
    }
    ;
    deleteAccount(password, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password) {
                throw new Error('Please provide password');
            }
            ;
            let user = yield this.user.findOne({ email: userEmail });
            if (!user) {
                throw new Error('User not found');
            }
            ;
            if (user.email === 'example@mail.com') {
                throw new Error('Not enough rights');
            }
            ;
            if (!(yield user.matchPassword(password))) {
                throw new Error('Password not found');
            }
            ;
            yield user.remove();
            yield this.budget.deleteMany({ user_id: user._id });
        });
    }
    ;
    sendMessage(email, message) {
        if (!email || !message) {
            throw new Error('Please provide an email address and a message');
        }
        ;
    }
    ;
    addItem(user_id, value, amount, currency, category, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value || !amount || !currency || !category || !description) {
                throw new Error('Please provide the data');
            }
            ;
            if (!user_id) {
                throw new Error('User not found');
            }
            ;
            yield this.budget.create({ user_id, value, amount, currency, category, description });
        });
    }
    ;
    editItem(id, value, amount, currency, category, description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !value || !amount || !currency || !category || !description) {
                throw new Error('Please provide the data');
            }
            ;
            let options = { new: true };
            let edit = { id, value, amount, currency, category, description };
            yield this.budget.findByIdAndUpdate(id, edit, options).exec();
        });
    }
    ;
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('Please provide an ID');
            }
            ;
            yield this.budget.findByIdAndDelete(id).exec();
        });
    }
    ;
}
;
exports.default = BudgetValidation;
