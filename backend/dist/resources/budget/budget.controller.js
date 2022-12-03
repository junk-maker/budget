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
var email_service_1 = __importDefault(require("@/utils/services/email.service"));
var protected_route_1 = __importDefault(require("@/middleware/protected.route"));
var http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
var express_1 = require("express");
var budget_validation_1 = __importDefault(require("@/resources/budget/budget.validation"));
var sending_data_service_1 = __importDefault(require("@/utils/services/sending.data.service"));
var BudgetController = /** @class */ (function () {
    function BudgetController() {
        var _this = this;
        this.path = '/budget';
        this.router = (0, express_1.Router)();
        this.protected = protected_route_1.default;
        this.EmailService = new email_service_1.default();
        this.BudgetValidation = new budget_validation_1.default();
        this.SendingDataService = new sending_data_service_1.default();
        this.getFeatures = function (req, res, next) {
            try {
                _this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.getStatistics = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.SendingDataService.jsonResponseData(req, res, 200)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(err_1)];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getSettings = function (req, res, next) {
            try {
                _this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.changeEmail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.BudgetValidation.changeEmail(email, req.user.email)];
                    case 2:
                        _a.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'Email updated success', 201);
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, next(err_2)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, password, newPassword, confirmPassword, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.BudgetValidation.changePassword(password, newPassword, confirmPassword, req.user.email)];
                    case 2:
                        _b.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'Password updated success', 201);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        return [2 /*return*/, next(err_3)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteAccount = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var password, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = req.body.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.BudgetValidation.deleteAccount(password, req.user.email)];
                    case 2:
                        _a.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'Account successfully deleted', 201);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(err_4)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getMessage = function (req, res, next) {
            try {
                _this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
            }
            catch (err) {
                return next(err);
            }
            ;
        };
        this.sendMessage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, message, opts, _b, _c, _d, err_5;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.body, email = _a.email, message = _a.message;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        this.BudgetValidation.sendMessage(email, message);
                        opts = {
                            email: email,
                            text: message,
                            type: 'send-message',
                        };
                        _c = (_b = this.SendingDataService).jsonResponseMessage;
                        _d = [res];
                        return [4 /*yield*/, this.EmailService.sendingEmail(opts)];
                    case 2:
                        _c.apply(_b, _d.concat([_e.sent(), 200]));
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _e.sent();
                        return [2 /*return*/, next(new http_exeption_1.default('The email could not be sent', 500))];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getBudget = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.SendingDataService.jsonResponseData(req, res, 200)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, next(err_6)];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.addItem = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, _a, value, amount, currency, category, description, err_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = req.user._id;
                        _a = req.body, value = _a.value, amount = _a.amount, currency = _a.currency, category = _a.category, description = _a.description;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.BudgetValidation.addItem(user_id, value, amount, currency, category, description)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.SendingDataService.jsonResponseData(req, res, 201)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _b.sent();
                        return [2 /*return*/, next(err_7)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.editItem = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, id, value, amount, currency, category, description, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, value = _a.value, amount = _a.amount, currency = _a.currency, category = _a.category, description = _a.description;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.BudgetValidation.editItem(id, value, amount, currency, category, description)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.SendingDataService.jsonResponseData(req, res, 201)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _b.sent();
                        return [2 /*return*/, next(err_8)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteItem = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        ;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.BudgetValidation.deleteItem(id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.SendingDataService.jsonResponseData(req, res, 201)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_9 = _a.sent();
                        return [2 /*return*/, next(err_9)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.routes();
    }
    ;
    BudgetController.prototype.routes = function () {
        this.router.get("".concat(this.path, "/contact"), this.protected(), this.getMessage);
        this.router.post("".concat(this.path, "/contact"), this.protected(), this.sendMessage);
        this.router.get("".concat(this.path, "/features"), this.protected(), this.getFeatures);
        this.router.get("".concat(this.path, "/settings/:list"), this.protected(), this.getSettings);
        this.router.put("".concat(this.path, "/settings/change-email"), this.protected(), this.changeEmail);
        this.router.put("".concat(this.path, "/settings/change-password"), this.protected(), this.changePassword);
        this.router.delete("".concat(this.path, "/settings/delete-account"), this.protected(), this.deleteAccount);
        this.router.put("".concat(this.path, "/budget/:end/:year/:start/:month/:currency"), this.protected(), this.editItem);
        this.router.post("".concat(this.path, "/budget/:end/:year/:start/:month/:currency"), this.protected(), this.addItem);
        this.router.get("".concat(this.path, "/budget/:end/:year/:start/:month/:currency"), this.protected(), this.getBudget);
        this.router.delete("".concat(this.path, "/budget/:id/:end/:year/:start/:month/:currency"), this.protected(), this.deleteItem);
        this.router.get("".concat(this.path, "/statistics/:end/:year/:start/:month/:value/:currency"), this.protected(), this.getStatistics);
    };
    ;
    return BudgetController;
}());
;
exports.default = BudgetController;
