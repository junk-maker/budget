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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("@/resources/user/user.model"));
var budget_model_1 = __importDefault(require("@/resources/budget/budget.model"));
var email_service_1 = __importDefault(require("@/utils/services/email.service"));
var http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
var SendingDataService = /** @class */ (function () {
    function SendingDataService() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
        this.emailService = new email_service_1.default();
    }
    SendingDataService.prototype.sendToken = function (res, token, status) {
        res.status(status).json({ token: token, success: true });
    };
    ;
    SendingDataService.prototype.jsonResponseMessage = function (res, data, status) {
        res.status(status).json({ data: data, success: true });
    };
    ;
    SendingDataService.prototype.jsonResponseData = function (req, res, status) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, end, year, start, month, value, currency, db, _b, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params, end = _a.end, year = _a.year, start = _a.start, month = _a.month, value = _a.value, currency = _a.currency;
                        if (!((end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.budget.find({ user_id: req.user._id, 'currency.currency': currency })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.budget.find({ user_id: req.user._id, 'currency.currency': currency, date: { $gte: new Date(start), $lte: new Date(end) } })];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        db = _b;
                        data = (end === 'null' || end === 'undefined') || (start === 'null' || start === 'undefined')
                            ? db.filter(function (val) { return value === 'DoubleBarChart' || value === 'BalanceBarChart' ? new Date(val.date).getFullYear() === +year : (new Date(val.date).getMonth() === +month) && (new Date(val.date).getFullYear() === +year); })
                            : db;
                        res.status(status).json({ data: data, success: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    SendingDataService.prototype.complexResponseData = function (email, opts, token, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, message, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new http_exeption_1.default('User not found', 401))];
                        }
                        ;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.emailService.sendingEmail(opts)];
                    case 3:
                        message = _a.sent();
                        data = token ? [token, message] : message;
                        this.jsonResponseMessage(res, data, 200);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        user.token = undefined;
                        user.tokenExpire = undefined;
                        user.tokenForVerifyEmail = undefined;
                        user.expireTokenForVerifyEmail = undefined;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, next(new http_exeption_1.default('The email could not be sent', 500))];
                    case 6:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return SendingDataService;
}());
;
exports.default = SendingDataService;
