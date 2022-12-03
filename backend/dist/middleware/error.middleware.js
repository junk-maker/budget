"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var status_code_service_1 = __importDefault(require("../utils/services/status.code.service"));
function errorMiddleware(err, req, res, next) {
    var error = __assign({}, err);
    error.message = err.message;
    res.status(error.statusCode || (0, status_code_service_1.default)(error.message)).json({
        success: false,
        error: error.message || 'Server Error',
    });
}
;
exports.default = errorMiddleware;
