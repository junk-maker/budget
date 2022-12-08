"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
require("module-alias/register");
const user_controller_1 = __importDefault(require("@/resources/user/user.controller"));
const budget_controller_1 = __importDefault(require("@/resources/budget/budget.controller"));
const app = new app_1.default([new budget_controller_1.default(), new user_controller_1.default()], Number(process.env.PORT));
app.listen();
