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
var budget_data_1 = require("@/utils/services/budget.data");
var user_model_1 = __importDefault(require("@/resources/user/user.model"));
var token_service_1 = __importDefault(require("@/utils/services/token.service"));
var budget_model_1 = __importDefault(require("@/resources/budget/budget.model"));
var UserValidation = /** @class */ (function () {
    function UserValidation() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
    }
    UserValidation.prototype.register = function (name, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, verifyEmailToken, tokenForRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!email || !password) {
                            throw new Error('Please provide an email and password');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: email })];
                    case 1:
                        if (_a.sent()) {
                            throw new Error('Email address already registered');
                        }
                        ;
                        return [4 /*yield*/, this.user.create({ name: name, email: email, password: password })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.user.findOne({ email: email })];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User is not found');
                        }
                        ;
                        token = user.getToken();
                        verifyEmailToken = user.getVerifyEmailToken();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _a.sent();
                        tokenForRegister = {
                            token: token,
                            verifyEmailToken: verifyEmailToken,
                        };
                        return [2 /*return*/, tokenForRegister];
                }
            });
        });
    };
    ;
    UserValidation.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!email || !password) {
                            throw new Error('Please provide an email and password');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: email }).select('+password')];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Email not found');
                        }
                        ;
                        // Check email confirmation
                        if (user.pending === true) {
                            throw new Error('Please confirm your email');
                        }
                        ;
                        return [4 /*yield*/, user.matchPassword(password)];
                    case 2:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        throw new Error('Password not found');
                    case 3:
                        if (!(email === 'example@mail.com')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.budget.deleteMany({ user_id: user._id })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.budget.insertMany((0, budget_data_1.data)(user._id))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        ;
                        token = user.getSignedJwtToken();
                        return [2 /*return*/, token];
                    case 7:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserValidation.prototype.emailActivation = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var comparedToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            throw new Error('Please provide a token');
                        }
                        ;
                        comparedToken = this.comparedToken(token);
                        return [4 /*yield*/, this.user.findOne({
                                token: comparedToken,
                                tokenExpire: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 2];
                        throw new Error('Invalid request');
                    case 2:
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
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserValidation.prototype.passwordRecovery = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (email === 'example@mail.com') {
                            throw new Error('Not enough rights');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User is not found');
                        }
                        ;
                        token = user.getToken();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    ;
    UserValidation.prototype.passwordReset = function (token, password, confirmPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var comparedToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (password !== confirmPassword) {
                            throw new Error('Password do not match');
                        }
                        ;
                        comparedToken = this.comparedToken(token);
                        return [4 /*yield*/, this.user.findOne({
                                token: comparedToken,
                                tokenExpire: { $gt: Date.now() }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 2];
                        throw new Error('Invalid request');
                    case 2:
                        user.password = password;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserValidation.prototype.getVerify = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var comparedToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comparedToken = this.comparedToken(token);
                        return [4 /*yield*/, this.user.findOne({
                                tokenForVerifyEmail: comparedToken,
                                expireTokenForVerifyEmail: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Invalid request');
                        }
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserValidation.prototype.getVerifyEmail = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var comparedToken, user, getToken, tokenForVerifyEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comparedToken = this.comparedToken(token);
                        return [4 /*yield*/, this.user.findOne({
                                tokenForVerifyEmail: comparedToken,
                                expireTokenForVerifyEmail: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('Invalid request');
                        }
                        ;
                        getToken = user.getToken();
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        tokenForVerifyEmail = {
                            token: getToken,
                            email: user.email,
                        };
                        return [2 /*return*/, tokenForVerifyEmail];
                }
            });
        });
    };
    ;
    UserValidation.prototype.getUrl = function (path) {
        return "".concat(process.env.DOMAIN).concat(path);
    };
    ;
    UserValidation.prototype.comparedToken = function (token) {
        return token_service_1.default.compareToken(token);
    };
    ;
    return UserValidation;
}());
;
exports.default = UserValidation;
