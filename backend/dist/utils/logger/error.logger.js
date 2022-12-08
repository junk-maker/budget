"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var express_winston_1 = require("express-winston");
function logsInternalErrors() {
    console.log('work');
    var myFormat = winston_1.format.printf(function (_a) {
        var level = _a.level, meta = _a.meta, timestamp = _a.timestamp;
        return "".concat(timestamp, " ").concat(level, ": ").concat(meta.message);
    });
    return (0, express_winston_1.errorLogger)({
        transports: [
            new winston_1.transports.File({
                filename: 'logsInternalErrors.log'
            })
        ],
        format: winston_1.format.combine(winston_1.format.json(), winston_1.format.timestamp(), myFormat)
    });
}
;
exports.default = logsInternalErrors;
