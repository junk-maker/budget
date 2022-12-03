"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var mongoose_1 = __importDefault(require("mongoose"));
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.red = '\x1b[31m%s\x1b[0m';
        this.blue = '\x1b[34m%s\x1b[0m';
        this.yellow = '\x1b[33m%s\x1b[0m';
        this.middleware();
        this.databaseConnection();
        this.controllers(controllers);
    }
    ;
    App.prototype.middleware = function () {
        this.express.use((0, cors_1.default)());
        this.express.use((0, helmet_1.default)());
        this.express.use((0, compression_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
    };
    ;
    App.prototype.controllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    ;
    App.prototype.errorHandling = function () {
        this.express.use(error_middleware_1.default);
    };
    ;
    App.prototype.databaseConnection = function () {
        var _this = this;
        mongoose_1.default.connect("".concat(process.env.MONGO_URI))
            .then(function () { return console.log(_this.yellow, 'MongoDB connection SUCCESS!'); })
            .catch(function (err) { return console.log(_this.red, "MongoDB connection FAIL: ".concat(err)); });
    };
    ;
    App.prototype.listen = function () {
        var _this = this;
        this.errorHandling();
        this.express.listen(this.port, function () {
            console.log(_this.blue, "Server has been started on port ".concat(_this.port, "!"));
        });
    };
    ;
    return App;
}());
;
exports.default = App;
