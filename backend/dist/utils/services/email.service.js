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
var nodemailer_1 = __importDefault(require("nodemailer"));
var EmailService = /** @class */ (function () {
    function EmailService() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
    }
    ;
    EmailService.prototype.sendingEmail = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var message, sending;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = function (type) {
                            return {
                                register: "\n                    <h3>Hello ".concat(opts.name, "</h3>\n                    <p>Thank you for registering in our application. Very grateful! The final step lies ahead ...</p>\n                    <p>To activate your account, follow this link: \n                    <a target=\"_\" href=").concat(opts.url, ">").concat(opts.url, "</a>\n                    </p>\n                    <p>Best wishes</p>\n                    <p>Your development team</p>\n                "),
                                'password-recovery': "\n                    <h1>You requested a password reset</h1>\n                    <p>Please make a request for placement at the following link:</p>\n                    <a href=".concat(opts.url, ">").concat(opts.url, "</a>\n                "),
                                'verify-email': "\n                    <p>Resend activation message</p>\n                    <p>To activate your account, follow this link:  \n                    <a target=\"_\" href=".concat(opts.url, ">").concat(opts.url, "</a\n                    </p>\n                    <p>Best wishes</p>\n                    <p>Your development team</p>\n                "),
                                'send-message': opts.text,
                            }[type];
                        };
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: process.env.MAIL_FROM,
                                to: process.env.MAIL_TO,
                                subject: "Message from ".concat(opts.email),
                                html: message(opts.type),
                            })];
                    case 1:
                        sending = _a.sent();
                        return [2 /*return*/, sending];
                }
            });
        });
    };
    ;
    return EmailService;
}());
;
exports.default = EmailService;
