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
const email_service_1 = __importDefault(require("@/utils/services/email.service"));
const http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
const user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
const express_1 = require("express");
const sending_data_service_1 = __importDefault(require("@/utils/services/sending.data.service"));
class UserController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.EmailService = new email_service_1.default();
        this.UserValidation = new user_validation_1.default();
        this.SendingDataService = new sending_data_service_1.default();
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let response = yield this.UserValidation.login(email, password);
                this.SendingDataService.sendToken(res, response, 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { name, email, password } = req.body;
            try {
                let response = yield this.UserValidation.register(name, email, password);
                let opts = {
                    name,
                    email,
                    type: 'register',
                    url: this.UserValidation.getUrl(`email-activation/${response.token}`),
                };
                yield this.SendingDataService.complexResponseData(email, opts, response.verifyEmailToken, res, next);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.emailActivation = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                yield this.UserValidation.emailActivation(token);
                this.SendingDataService.jsonResponseMessage(res, 'The email was successfully activated', 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.passwordRecovery = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                let response = yield this.UserValidation.passwordRecovery(email);
                let opts = {
                    email,
                    type: 'password-recovery',
                    url: this.UserValidation.getUrl(`reset-password/${response}`),
                };
                yield this.SendingDataService.complexResponseData(email, opts, null, res, next);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.passwordReset = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { resetToken } = req.params;
            const { password, confirmPassword } = req.body;
            try {
                yield this.UserValidation.passwordReset(resetToken, password, confirmPassword);
                this.SendingDataService.jsonResponseMessage(res, 'Password has been successfully updated', 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.getVerify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                yield this.UserValidation.getVerify(token);
                this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.getVerifyEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            try {
                let response = yield this.UserValidation.getVerifyEmail(token);
                let opts = {
                    type: 'verify-email',
                    email: response.email,
                    url: this.UserValidation.getUrl(`email-activation/${response.token}`),
                };
                this.SendingDataService.jsonResponseMessage(res, yield this.EmailService.sendingEmail(opts), 200);
            }
            catch (err) {
                return next(new http_exeption_1.default('The email could not be sent', 500));
            }
            ;
        });
        this.routes();
    }
    ;
    routes() {
        this.router.post(`${this.path}/sign-in`, this.login);
        this.router.post(`${this.path}/sign-up`, this.register);
        this.router.get(`${this.path}/verify-email/:token`, this.getVerify);
        this.router.post(`${this.path}/verify-email/:token`, this.getVerifyEmail);
        this.router.post(`${this.path}/password-recovery`, this.passwordRecovery);
        this.router.get(`${this.path}/email-activation/:token`, this.emailActivation);
        this.router.put(`${this.path}/password-reset/:resetToken`, this.passwordReset);
    }
    ;
}
;
exports.default = UserController;
