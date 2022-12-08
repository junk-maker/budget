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
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
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
    sendingEmail(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = (type) => {
                return {
                    register: `
                    <h3>Hello ${opts.name}</h3>
                    <p>Thank you for registering in our application. Very grateful! The final step lies ahead ...</p>
                    <p>To activate your account, follow this link: 
                    <a target="_" href=${opts.url}>${opts.url}</a>
                    </p>
                    <p>Best wishes</p>
                    <p>Your development team</p>
                `,
                    'password-recovery': `
                    <h1>You requested a password reset</h1>
                    <p>Please make a request for placement at the following link:</p>
                    <a href=${opts.url}>${opts.url}</a>
                `,
                    'verify-email': `
                    <p>Resend activation message</p>
                    <p>To activate your account, follow this link:  
                    <a target="_" href=${opts.url}>${opts.url}</a
                    </p>
                    <p>Best wishes</p>
                    <p>Your development team</p>
                `,
                    'send-message': opts.text,
                }[type];
            };
            let sending = yield this.transporter.sendMail({
                from: process.env.MAIL_FROM,
                to: process.env.MAIL_TO,
                subject: `Message from ${opts.email}`,
                html: message(opts.type),
            });
            return sending;
        });
    }
    ;
}
;
exports.default = EmailService;
