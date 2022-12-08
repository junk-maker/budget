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
const email_service_1 = __importDefault(require("@/utils/services/email.service"));
const http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
class SendingDataService {
    constructor() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
        this.emailService = new email_service_1.default();
    }
    sendToken(res, token, status) {
        res.status(status).json({ token, success: true });
    }
    ;
    jsonResponseMessage(res, data, status) {
        res.status(status).json({ data, success: true });
    }
    ;
    jsonResponseData(req, res, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { end, year, start, month, value, currency } = req.params;
            let db = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined')
                ? yield this.budget.find({ user_id: req.user._id, 'currency.currency': currency })
                : yield this.budget.find({ user_id: req.user._id, 'currency.currency': currency, date: { $gte: new Date(start), $lte: new Date(end) } });
            let data = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined')
                ? db.filter(val => value === 'DoubleBarChart' || value === 'BalanceBarChart' ? new Date(val.date).getFullYear() === +year : (new Date(val.date).getMonth() === +month) && (new Date(val.date).getFullYear() === +year))
                : db;
            res.status(status).json({ data, success: true });
        });
    }
    ;
    complexResponseData(email, opts, token, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.user.findOne({ email });
            if (!user) {
                return next(new http_exeption_1.default('User not found', 401));
            }
            ;
            try {
                let message = yield this.emailService.sendingEmail(opts);
                let data = token ? [token, message] : message;
                this.jsonResponseMessage(res, data, 200);
            }
            catch (err) {
                user.token = undefined;
                user.tokenExpire = undefined;
                user.tokenForVerifyEmail = undefined;
                user.expireTokenForVerifyEmail = undefined;
                yield user.save();
                return next(new http_exeption_1.default('The email could not be sent', 500));
            }
            ;
        });
    }
    ;
}
;
exports.default = SendingDataService;
