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
var http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
var user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
var express_1 = require("express");
var sending_data_service_1 = __importDefault(require("@/utils/services/sending.data.service"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.EmailService = new email_service_1.default();
        this.UserValidation = new user_validation_1.default();
        this.SendingDataService = new sending_data_service_1.default();
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, response, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserValidation.login(email, password)];
                    case 2:
                        response = _b.sent();
                        this.SendingDataService.sendToken(res, response, 200);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, next(err_1)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name, email, password, response, opts, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.UserValidation.register(name, email, password)];
                    case 2:
                        response = _b.sent();
                        opts = {
                            name: name,
                            email: email,
                            type: 'register',
                            url: this.UserValidation.getUrl("email-activation/".concat(response.token)),
                        };
                        return [4 /*yield*/, this.SendingDataService.complexResponseData(email, opts, response.verifyEmailToken, res, next)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        return [2 /*return*/, next(err_2)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.emailActivation = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.params.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserValidation.emailActivation(token)];
                    case 2:
                        _a.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'The email was successfully activated', 201);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.passwordRecovery = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, response, opts, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.UserValidation.passwordRecovery(email)];
                    case 2:
                        response = _a.sent();
                        opts = {
                            email: email,
                            type: 'password-recovery',
                            url: this.UserValidation.getUrl("reset-password/".concat(response)),
                        };
                        return [4 /*yield*/, this.SendingDataService.complexResponseData(email, opts, null, res, next)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, next(err_4)];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.passwordReset = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var resetToken, _a, password, confirmPassword, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resetToken = req.params.resetToken;
                        _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserValidation.passwordReset(resetToken, password, confirmPassword)];
                    case 2:
                        _b.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'Password has been successfully updated', 201);
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _b.sent();
                        return [2 /*return*/, next(err_5)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getVerify = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.params.token;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.UserValidation.getVerify(token)];
                    case 2:
                        _a.sent();
                        this.SendingDataService.jsonResponseMessage(res, 'Connect has been initialized', 200);
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, next(err_6)];
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.getVerifyEmail = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, response, opts, _a, _b, _c, err_7;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        token = req.body.token;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.UserValidation.getVerifyEmail(token)];
                    case 2:
                        response = _d.sent();
                        opts = {
                            type: 'verify-email',
                            email: response.email,
                            url: this.UserValidation.getUrl("email-activation/".concat(response.token)),
                        };
                        _b = (_a = this.SendingDataService).jsonResponseMessage;
                        _c = [res];
                        return [4 /*yield*/, this.EmailService.sendingEmail(opts)];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent(), 200]));
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _d.sent();
                        return [2 /*return*/, next(new http_exeption_1.default('The email could not be sent', 500))];
                    case 5:
                        ;
                        return [2 /*return*/];
                }
            });
        }); };
        this.routes();
    }
    ;
    UserController.prototype.routes = function () {
        this.router.post("".concat(this.path, "/sign-in"), this.login);
        this.router.post("".concat(this.path, "/sign-up"), this.register);
        this.router.get("".concat(this.path, "/verify-email/:token"), this.getVerify);
        this.router.post("".concat(this.path, "/verify-email/:token"), this.getVerifyEmail);
        this.router.post("".concat(this.path, "/password-recovery"), this.passwordRecovery);
        this.router.get("".concat(this.path, "/email-activation/:token"), this.emailActivation);
        this.router.put("".concat(this.path, "/password-reset/:resetToken"), this.passwordReset);
    };
    ;
    return UserController;
}());
;
exports.default = UserController;