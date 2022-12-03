"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMiddleware = /** @class */ (function () {
    function ErrorMiddleware() {
    }
    ErrorMiddleware.prototype.error = function (error, req, res, _next) {
        console.log(error, 'HttpException');
        var status = error.statusCode || 500;
        var message = error.message || 'Something went wrong';
        res.status(status).json({
            status: status,
            message: message,
        });
    };
    ;
    return ErrorMiddleware;
}());
;
// function errorMiddleware(error: HttpException, req: Request, res: Response, _next: NextFunction): void {
//     console.log(error, 'HttpException')
//     const status = error.status || 500;
//     const message = error.message || 'Something went wrong';
//     res.status(status).send({
//         status,
//         message,
//     });
// }
exports.default = ErrorMiddleware;
