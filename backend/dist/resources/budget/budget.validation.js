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
var BudgetValidation = /** @class */ (function () {
    function BudgetValidation() {
        this.user = user_model_1.default;
        this.budget = budget_model_1.default;
    }
    BudgetValidation.prototype.changeEmail = function (email, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!email) {
                            throw new Error('Please provide an email');
                        }
                        ;
                        if (email === 'example@mail.com') {
                            throw new Error('Not enough rights');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: userEmail })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User is not found');
                        }
                        ;
                        user.email = email;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    BudgetValidation.prototype.changePassword = function (password, newPassword, confirmPassword, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!password || !newPassword || !confirmPassword) {
                            throw new Error('Please provide data');
                        }
                        ;
                        if (password === '@example') {
                            throw new Error('Not enough rights');
                        }
                        ;
                        if (newPassword !== confirmPassword) {
                            throw new Error('Password do not match');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: userEmail })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User is not found');
                        }
                        ;
                        return [4 /*yield*/, user.matchPassword(password)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error('Password not found');
                        }
                        ;
                        user.password = newPassword;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    BudgetValidation.prototype.deleteAccount = function (password, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!password) {
                            throw new Error('Please provide password');
                        }
                        ;
                        if (password === '@example') {
                            throw new Error('Not enough rights');
                        }
                        ;
                        return [4 /*yield*/, this.user.findOne({ email: userEmail })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error('User is not found');
                        }
                        ;
                        return [4 /*yield*/, user.matchPassword(password)];
                    case 2:
                        if (!(_a.sent())) {
                            throw new Error('Password not found');
                        }
                        ;
                        return [4 /*yield*/, user.remove()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.budget.deleteMany({ user_id: user._id })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    BudgetValidation.prototype.sendMessage = function (email, message) {
        if (!email || !message) {
            throw new Error('Please provide an email and a message');
        }
        ;
    };
    ;
    BudgetValidation.prototype.addItem = function (user_id, value, amount, currency, category, description) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!value || !amount || !currency || !category || !description) {
                            throw new Error('Please provide data');
                        }
                        ;
                        if (!user_id) {
                            throw new Error('User is not found');
                        }
                        ;
                        return [4 /*yield*/, this.budget.create({ user_id: user_id, value: value, amount: amount, currency: currency, category: category, description: description })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    BudgetValidation.prototype.editItem = function (id, value, amount, currency, category, description) {
        return __awaiter(this, void 0, void 0, function () {
            var options, edit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id || !value || !amount || !currency || !category || !description) {
                            throw new Error('Please provide data');
                        }
                        ;
                        options = { new: true };
                        edit = { id: id, value: value, amount: amount, currency: currency, category: category, description: description };
                        return [4 /*yield*/, this.budget.findByIdAndUpdate(id, edit, options).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    BudgetValidation.prototype.deleteItem = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error('Please provide an id');
                        }
                        ;
                        return [4 /*yield*/, this.budget.findByIdAndDelete(id).exec()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return BudgetValidation;
}());
;
exports.default = BudgetValidation;
