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
var crypto_1 = __importDefault(require("crypto"));
// import bcrypt from 'bcryptjs';
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide username'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+(?:[A-Z]{2}|ru|com|org|net)))$/,
            'Please provide valid email',
        ],
    },
    password: {
        type: String,
        minlength: 6,
        select: false,
        required: [true, 'Please provide password'],
    },
    pending: {
        type: Boolean,
        unique: false,
        default: true,
    },
    token: String,
    tokenExpire: Date,
    tokenForVerifyEmail: String,
    expireTokenForVerifyEmail: Date
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!this.isModified('password')) {
                next();
            }
            ;
            // const salt = await bcrypt.genSalt(10);
            // this.password = await bcrypt.hash(this.password, salt);
            next();
            return [2 /*return*/];
        });
    });
});
// UserSchema.methods.matchPassword = async function(password: string) {
//     return await bcrypt.compare(password, this.password);
// };
//Token for local storage
UserSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, "".concat(process.env.JWT_SECRET), {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
// Reset token and add to database hashed (private) version of token
UserSchema.methods.getToken = function () {
    var token = crypto_1.default.randomBytes(20).toString('hex');
    // Hash token (private key) and save to database
    this.token = crypto_1.default
        .createHash('sha256')
        .update(token)
        .digest('hex');
    // Set token expire date
    this.tokenExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
    return token;
};
UserSchema.methods.getVerifyEmailToken = function () {
    var token = crypto_1.default.randomBytes(20).toString('hex');
    // Hash token (private key) and save to database
    this.tokenForVerifyEmail = crypto_1.default
        .createHash('sha256')
        .update(token)
        .digest('hex');
    // Set token expire date
    this.expireTokenForVerifyEmail = Date.now() + 10 * (30 * 1000); // 5 Minutes
    return token;
};
var User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;