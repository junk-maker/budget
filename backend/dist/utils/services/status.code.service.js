"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function statusCode(type) {
    switch (type) {
        case 'User not found': return 401;
        case 'Invalid request': return 401;
        case 'Email not found': return 401;
        case 'Not enough rights': return 401;
        case 'Password not found': return 401;
        case 'Please provide an ID': return 400;
        case 'Please provide a TOKEN': return 400;
        case 'Please provide password': return 400;
        case 'Please provide the data': return 400;
        case 'Password does not match': return 401;
        case 'Email address already registered': return 401;
        case 'Please confirm your email address': return 401;
        case 'Please specify your email address': return 400;
        case 'Please provide an email address and a message': return 400;
        case 'Please provide your email address and password': return 400;
        default: return 500;
    }
    ;
}
;
exports.default = statusCode;
