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
const token_service_1 = __importDefault(require("@/utils/services/token.service"));
const http_exeption_1 = __importDefault(require("@/utils/exeptions/http.exeption"));
function protectedRoute() {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        ;
        if (!token) {
            return next(new http_exeption_1.default('Not authorized to access this route', 401));
        }
        ;
        try {
            let decoded = yield token_service_1.default.verifyToken(token);
            let user = yield user_model_1.default.findById(decoded.id);
            if (!user) {
                return next(new http_exeption_1.default('The user with this ID was not found', 404));
            }
            ;
            req.user = user;
            next();
        }
        catch (err) {
            return next(new http_exeption_1.default('Not authorized to access this router', 401));
        }
        ;
    });
}
;
exports.default = protectedRoute;
