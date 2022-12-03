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
// import {data} from '../data/data';
var User_1 = __importDefault(require("../models/User"));
var Budget_1 = __importDefault(require("../models/Budget"));
var helper_controller_1 = __importDefault(require("./helper.controller"));
var error_service_1 = __importDefault(require("../services/error.service"));
// import SendDataService from '../services/sendDataService';
var AppController = /** @class */ (function () {
    function AppController() {
    }
    AppController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user_1, user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('work');
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!(email === 'example@mail.com')) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user_1 = _b.sent();
                        return [4 /*yield*/, Budget_1.default.deleteMany({ user_id: user_1._id })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        ;
                        if (!email || !password) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide an email and password', 400))];
                        }
                        ;
                        return [4 /*yield*/, User_1.default.findOne({ email: email }).select('+password')];
                    case 4:
                        user = _b.sent();
                        token = user.getSignedJwtToken();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('Email not found', 401))];
                        }
                        ;
                        // Check email confirmation
                        if (user.pending === true) {
                            return [2 /*return*/, next(new error_service_1.default('Please confirm your email', 401))];
                        }
                        ;
                        return [4 /*yield*/, helper_controller_1.default.isMatch(user, next, password)];
                    case 5:
                        _b.sent();
                        try {
                            // SendDataService.sendToken(res, token, 200);
                        }
                        catch (err) {
                            return [2 /*return*/, next(err)];
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.register = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, user, token, verifyEmailToken, url, opts;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        if (_b.sent()) {
                            return [2 /*return*/, next(new error_service_1.default('Email address already registered', 401))];
                        }
                        ;
                        if (!email || !password) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide an email and password', 400))];
                        }
                        ;
                        return [4 /*yield*/, User_1.default.create({ name: name, email: email, password: password })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 3:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('User is not found', 401))];
                        }
                        ;
                        token = user.getToken();
                        verifyEmailToken = user.getVerifyEmailToken();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        url = "".concat(process.env.DOMAIN, "email-activation/").concat(token);
                        opts = {
                            url: url,
                            name: name,
                            email: email,
                            type: 'register',
                        };
                        try {
                            // await SendDataService.complexResponseData(user, opts, token = verifyEmailToken, res, next);
                        }
                        catch (err) {
                            return [2 /*return*/, next(err)];
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.emailActivation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = helper_controller_1.default.compareToken(req.params.token);
                        return [4 /*yield*/, User_1.default.findOne({
                                token: token,
                                tokenExpire: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            next(new error_service_1.default('Invalid request', 400));
                        }
                        ;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        if (!user) return [3 /*break*/, 4];
                        user.pending = false;
                        user.token = undefined;
                        user.tokenExpire = undefined;
                        user.tokenForVerifyEmail = undefined;
                        user.expireTokenForVerifyEmail = undefined;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        ;
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, next(err_1)];
                    case 6:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.passwordRecovery = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, token, url, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('User is not found', 401))];
                        }
                        ;
                        if (email === 'example@mail.com') {
                            return [2 /*return*/, next(new error_service_1.default('Not enough rights', 401))];
                        }
                        ;
                        token = user.getToken();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        url = "".concat(process.env.DOMAIN, "reset-password/").concat(token);
                        opts = {
                            url: url,
                            email: email,
                            type: 'password-recovery',
                        };
                        try {
                            // await SendDataService.complexResponseData(user, opts, null, res, next);
                        }
                        catch (err) {
                            return [2 /*return*/, next(err)];
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.passwordReset = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, confirmPassword, token, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
                        if (password !== confirmPassword) {
                            return [2 /*return*/, next(new error_service_1.default('Password do not match', 400))];
                        }
                        ;
                        token = helper_controller_1.default.compareToken(req.params.resetToken);
                        return [4 /*yield*/, User_1.default.findOne({
                                token: token,
                                tokenExpire: { $gt: Date.now() }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            next(new error_service_1.default('Invalid request', 401));
                        }
                        ;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!user) return [3 /*break*/, 4];
                        user.password = password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        ;
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        return [2 /*return*/, next(err_2)];
                    case 6:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.getVerify = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenForVerifyEmail, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenForVerifyEmail = helper_controller_1.default.compareToken(req.params.token);
                        return [4 /*yield*/, User_1.default.findOne({
                                tokenForVerifyEmail: tokenForVerifyEmail,
                                expireTokenForVerifyEmail: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('Invalid request', 401))];
                        }
                        ;
                        try {
                            // SendDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
                        }
                        catch (err) {
                            return [2 /*return*/, next(err)];
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.getVerifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenForVerifyEmail, user, token, url, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenForVerifyEmail = helper_controller_1.default.compareToken(req.body.token);
                        return [4 /*yield*/, User_1.default.findOne({
                                tokenForVerifyEmail: tokenForVerifyEmail,
                                expireTokenForVerifyEmail: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('Invalid request', 401))];
                        }
                        ;
                        token = user.getToken();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        url = "".concat(process.env.DOMAIN, "email-activation/").concat(token);
                        opts = {
                            url: url,
                            email: user.email,
                            type: 'verify-email',
                        };
                        try {
                            // if (user) return SendDataService.jsonResponseMessage(res, await MailService.sendEmail(opts), 200);  
                        }
                        catch (err) {
                            return [2 /*return*/, next(new error_service_1.default('The email could not be sent', 500))];
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.getFeatures = function (req, res, next) {
        try {
            // SendDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        }
        catch (err) {
            return next(err);
        }
        ;
    };
    ;
    AppController.prototype.getStatistics = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // await SendDataService.jsonResponseData(req, res, 200);
                }
                catch (err) {
                    return [2 /*return*/, next(err)];
                }
                ;
                return [2 /*return*/];
            });
        });
    };
    ;
    AppController.prototype.getSettings = function (req, res, next) {
        try {
            // SendDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        }
        catch (err) {
            return next(err);
        }
        ;
    };
    ;
    AppController.prototype.changeEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        return [4 /*yield*/, User_1.default.findOne({ email: req.user.email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('User not found', 401))];
                        }
                        ;
                        if (!email) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide an email', 401))];
                        }
                        ;
                        if (email === 'example@mail.com') {
                            return [2 /*return*/, next(new error_service_1.default('Not enough rights', 401))];
                        }
                        ;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        user.email = email;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.changePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, newPassword, confirmPassword, user, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, newPassword = _a.newPassword, confirmPassword = _a.confirmPassword;
                        return [4 /*yield*/, User_1.default.findOne({ email: req.user.email }).select('+password')];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('User not found', 401))];
                        }
                        ;
                        if (password === '@example') {
                            return [2 /*return*/, next(new error_service_1.default('Not enough rights', 401))];
                        }
                        ;
                        if (!password || !newPassword || !confirmPassword) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide data', 401))];
                        }
                        ;
                        if (newPassword !== confirmPassword) {
                            return [2 /*return*/, next(new error_service_1.default('Password do not match', 400))];
                        }
                        ;
                        return [4 /*yield*/, helper_controller_1.default.isMatch(user, next, password)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        user.password = newPassword;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _b.sent();
                        return [2 /*return*/, next(err_4)];
                    case 6:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.deleteAccount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = req.body.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: req.user.email }).select('+password')];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(new error_service_1.default('User not found', 401))];
                        }
                        ;
                        if (password === '@example') {
                            return [2 /*return*/, next(new error_service_1.default('Not enough rights', 401))];
                        }
                        ;
                        if (!password) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide password', 400))];
                        }
                        ;
                        return [4 /*yield*/, helper_controller_1.default.isMatch(user, next, password)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, user.remove()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Budget_1.default.deleteMany({ user_id: user._id })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        return [2 /*return*/, next(err_5)];
                    case 7:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.getMessage = function (req, res, next) {
        try {
            // SendDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
        }
        catch (err) {
            return next(err);
        }
        ;
    };
    ;
    AppController.prototype.sendMessage = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, message, opts;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, message = _a.message;
                opts = {
                    email: email,
                    text: message,
                    type: 'send-message',
                };
                try {
                    // SendDataService.jsonResponseMessage(res, await MailService.sendEmail(opts), 200);
                }
                catch (err) {
                    return [2 /*return*/, next(new error_service_1.default('The email could not be sent', 500))];
                }
                ;
                return [2 /*return*/];
            });
        });
    };
    ;
    AppController.prototype.getBudget = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // await SendDataService.jsonResponseData(req, res, 200);
                }
                catch (err) {
                    return [2 /*return*/, next(err)];
                }
                ;
                return [2 /*return*/];
            });
        });
    };
    ;
    AppController.prototype.addItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, _a, value, amount, currency, category, description, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = req.user._id;
                        _a = req.body, value = _a.value, amount = _a.amount, currency = _a.currency, category = _a.category, description = _a.description;
                        if (!user_id) {
                            return [2 /*return*/, next(new error_service_1.default('User is not found', 401))];
                        }
                        ;
                        if (!value || !amount || !currency || !category || !description) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide data', 400))];
                        }
                        ;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Budget_1.default.create({ user_id: user_id, value: value, amount: amount, currency: currency, category: category, description: description })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _b.sent();
                        return [2 /*return*/, next(err_6)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.deleteItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, next(new error_service_1.default('None id', 401))];
                        }
                        ;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Budget_1.default.findByIdAndDelete(id).exec()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, next(err_7)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    AppController.prototype.editItem = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var options, _a, id, value, amount, currency, category, description, edit, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = { new: true };
                        _a = req.body, id = _a.id, value = _a.value, amount = _a.amount, currency = _a.currency, category = _a.category, description = _a.description;
                        edit = { id: id, value: value, amount: amount, currency: currency, category: category, description: description };
                        if (!id || !value || !amount || !currency || !category || !description) {
                            return [2 /*return*/, next(new error_service_1.default('Please provide data', 400))];
                        }
                        ;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Budget_1.default.findByIdAndUpdate(id, edit, options).exec()];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _b.sent();
                        return [2 /*return*/, next(err_8)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return AppController;
}());
;
exports.default = new AppController();
