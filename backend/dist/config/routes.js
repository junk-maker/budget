"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesConfig = void 0;
var RoutesConfig = /** @class */ (function () {
    function RoutesConfig(app, name) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    ;
    RoutesConfig.prototype.getName = function () { return this.name; };
    ;
    return RoutesConfig;
}());
exports.RoutesConfig = RoutesConfig;
;
