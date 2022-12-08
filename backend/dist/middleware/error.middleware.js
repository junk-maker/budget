"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_service_1 = __importDefault(require("../utils/services/status.code.service"));
function errorMiddleware(err, req, res, next) {
    let error = Object.assign({}, err);
    error.message = err.message;
    res.status(error.statusCode || (0, status_code_service_1.default)(error.message)).json({
        success: false,
        error: error.message || 'Server Error',
    });
}
;
exports.default = errorMiddleware;
