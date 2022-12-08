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
const budget_data_1 = require("@/utils/services/budget.data");
const user_model_1 = __importDefault(require("@/resources/user/user.model"));
const token_service_1 = __importDefault(require("@/utils/services/token.service"));
const budget_model_1 = __importDefault(require("@/resources/budget/budget.model"));
class UserValidation {
    constructor() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error('Please provide your email address and password');
            }
            ;
            if (yield this.user.findOne({ email })) {
                throw new Error('Email address already registered');
            }
            ;
            yield this.user.create({ name, email, password });
            let user = yield this.user.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            ;
            // Reset Token Gen and add to database hashed (private) version of token
            let token = user.getToken();
            let verifyEmailToken = user.getVerifyEmailToken();
            yield user.save();
            let tokenForRegister = {
                token,
                verifyEmailToken,
            };
            return tokenForRegister;
        });
    }
    ;
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error('Please provide your email address and password');
            }
            ;
            let user = yield this.user.findOne({ email }).select('+password');
            if (!user) {
                throw new Error('Email not found');
            }
            ;
            // Check email confirmation
            if (user.pending === true) {
                throw new Error('Please confirm your email address');
            }
            ;
            // Check that password match
            if (!(yield user.matchPassword(password))) {
                throw new Error('Password not found');
            }
            else {
                if (email === 'example@mail.com') {
                    yield this.budget.deleteMany({ user_id: user._id });
                    yield this.budget.insertMany((0, budget_data_1.data)(user._id));
                }
                ;
                let token = user.getSignedJwtToken();
                return token;
            }
            ;
        });
    }
    ;
    emailActivation(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new Error('Please provide a TOKEN');
            }
            ;
            let comparedToken = this.comparedToken(token);
            let user = yield this.user.findOne({
                token: comparedToken,
                tokenExpire: { $gt: Date.now() },
            });
            if (!user) {
                throw new Error('Invalid request');
            }
            else {
                user.pending = false;
                user.token = undefined;
                user.tokenExpire = undefined;
                user.tokenForVerifyEmail = undefined;
                user.expireTokenForVerifyEmail = undefined;
                yield user.save();
            }
            ;
        });
    }
    ;
    passwordRecovery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email === 'example@mail.com') {
                throw new Error('Not enough rights');
            }
            ;
            let user = yield this.user.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            ;
            let token = user.getToken();
            yield user.save();
            return token;
        });
    }
    ;
    passwordReset(token, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password !== confirmPassword) {
                throw new Error('Password does not match');
            }
            ;
            let comparedToken = this.comparedToken(token);
            let user = yield this.user.findOne({
                token: comparedToken,
                tokenExpire: { $gt: Date.now() }
            });
            if (!user) {
                throw new Error('Invalid request');
            }
            else {
                user.password = password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                yield user.save();
            }
            ;
        });
    }
    ;
    getVerify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let comparedToken = this.comparedToken(token);
            let user = yield this.user.findOne({
                tokenForVerifyEmail: comparedToken,
                expireTokenForVerifyEmail: { $gt: Date.now() },
            });
            if (!user) {
                throw new Error('Invalid request');
            }
            ;
        });
    }
    ;
    getVerifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let comparedToken = this.comparedToken(token);
            let user = yield this.user.findOne({
                tokenForVerifyEmail: comparedToken,
                expireTokenForVerifyEmail: { $gt: Date.now() },
            });
            if (!user) {
                throw new Error('Invalid request');
            }
            ;
            // Reset Token Gen and add to database hashed (private) version of token
            let getToken = user.getToken();
            yield user.save();
            let tokenForVerifyEmail = {
                token: getToken,
                email: user.email,
            };
            return tokenForVerifyEmail;
        });
    }
    ;
    getUrl(token) {
        return `${process.env.DOMAIN}${token}`;
    }
    ;
    comparedToken(token) {
        return token_service_1.default.compareToken(token);
    }
    ;
}
;
exports.default = UserValidation;
