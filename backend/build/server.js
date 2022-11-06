"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/config/db"));
// const connectDB = require('./config/db');
// const errorHandler = require('./middleware/error');
// const authRoutes = require('./routers/routerForAuth');
// const budgetRoutes = require('./routers/routerForBudget');
// const contactRoutes = require('./routers/routerForContact');
// const featuresRoutes = require('./routers/routerForFeatures');
// const settingsRoutes = require('./routers/routerForSettings');
// const statisticRoutes = require('./routers/routerForStatistics');
// const verifyEmailRoutes = require('./routers/routerForVerifyEmail');
// const resetPasswordRoutes = require('./routers/routerForPasswordReset');
// const activateEmailRoutes = require('./routers/routerForEmailActivation');
// const recoverPasswordRoutes= require('./routers/routerForPasswordRecovery');
//App and port
const app = (0, express_1.default)();
dotenv_1.default.config({ path: './config.env' });
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const PORT = process.env.PORT || 5000;
;
//Connect to DB
(0, db_1.default)(yellow);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connecting Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/budget', budgetRoutes);
// app.use('/api/budget', contactRoutes);
// app.use('/api/budget', featuresRoutes);
// app.use('/api/budget', settingsRoutes);
// app.use('/api/budget', statisticRoutes);
// app.use('/api/auth', verifyEmailRoutes);
// app.use('/api/auth', activateEmailRoutes);
// app.use('/api/auth', resetPasswordRoutes);
// app.use('/api/auth', recoverPasswordRoutes);
// Error Handler Middleware
// app.use(errorHandler);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => res.send('Api running!!!'));
}
//Server
const server = app.listen(PORT, () => console.log(blue, `Server has been started on port ${PORT}!`));
// process.on('unhandledRejection', (err: Error) => {
//   console.log(red,`MongoDB connection FAIL: ${err.message}`);
//   server.close(() => process.exit(1));
// });
