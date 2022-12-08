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
const protected_route_1 = __importDefault(require("@/middleware/protected.route"));
const http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
const express_1 = require("express");
const budget_validation_1 = __importDefault(require("@/resources/budget/budget.validation"));
const sending_data_service_1 = __importDefault(require("@/utils/services/sending.data.service"));
class BudgetController {
    constructor() {
        this.path = '/budget';
        this.router = (0, express_1.Router)();
        this.protected = protected_route_1.default;
        this.EmailService = new email_service_1.default();
        this.BudgetValidation = new budget_validation_1.default();
        this.SendingDataService = new sending_data_service_1.default();
        this.getFeatures = (req, res, next) => {
            try {
                this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.getStatistics = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.SendingDataService.jsonResponseData(req, res, 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.getSettings = (req, res, next) => {
            try {
                this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.changeEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                yield this.BudgetValidation.changeEmail(email, req.user.email);
                this.SendingDataService.jsonResponseMessage(res, 'Email successfully updated', 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { password, newPassword, confirmPassword } = req.body;
            try {
                yield this.BudgetValidation.changePassword(password, newPassword, confirmPassword, req.user.email);
                this.SendingDataService.jsonResponseMessage(res, 'Password has been successfully updated', 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.deleteAccount = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            try {
                yield this.BudgetValidation.deleteAccount(password, req.user.email);
                this.SendingDataService.jsonResponseMessage(res, 'The account was successfully deleted', 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.getMessage = (req, res, next) => {
            try {
                this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.sendMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, message } = req.body;
            try {
                this.BudgetValidation.sendMessage(email, message);
                let opts = {
                    email,
                    text: message,
                    type: 'send-message',
                };
                this.SendingDataService.jsonResponseMessage(res, yield this.EmailService.sendingEmail(opts), 200);
            }
            catch (err) {
                return next(new http_exeption_1.default('The email could not be sent', 500));
            }
            ;
        });
        this.getBudget = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.SendingDataService.jsonResponseData(req, res, 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.addItem = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user._id;
            const { value, amount, currency, category, description } = req.body;
            try {
                yield this.BudgetValidation.addItem(user_id, value, amount, currency, category, description);
                yield this.SendingDataService.jsonResponseData(req, res, 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.editItem = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id, value, amount, currency, category, description } = req.body;
            try {
                yield this.BudgetValidation.editItem(id, value, amount, currency, category, description);
                yield this.SendingDataService.jsonResponseData(req, res, 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.deleteItem = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            ;
            try {
                yield this.BudgetValidation.deleteItem(id);
                yield this.SendingDataService.jsonResponseData(req, res, 201);
            }
            catch (err) {
                return next(err);
            }
            ;
        });
        this.routes();
    }
    ;
    routes() {
        this.router.get(`${this.path}/contact`, this.protected(), this.getMessage);
        this.router.post(`${this.path}/contact`, this.protected(), this.sendMessage);
        this.router.get(`${this.path}/features`, this.protected(), this.getFeatures);
        this.router.get(`${this.path}/settings/:list`, this.protected(), this.getSettings);
        this.router.put(`${this.path}/settings/change-email`, this.protected(), this.changeEmail);
        this.router.put(`${this.path}/settings/change-password`, this.protected(), this.changePassword);
        this.router.delete(`${this.path}/settings/delete-account`, this.protected(), this.deleteAccount);
        this.router.put(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.editItem);
        this.router.post(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.addItem);
        this.router.get(`${this.path}/budget/:end/:year/:start/:month/:currency`, this.protected(), this.getBudget);
        this.router.delete(`${this.path}/budget/:id/:end/:year/:start/:month/:currency`, this.protected(), this.deleteItem);
        this.router.get(`${this.path}/statistics/:end/:year/:start/:month/:value/:currency`, this.protected(), this.getStatistics);
    }
    ;
}
;
exports.default = BudgetController;
