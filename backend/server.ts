import path from 'path';
import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import express from 'express';
import winston from 'winston';
import connectDB from './src/config/db';
import {RoutesConfig} from './src/config/routes';
import ErrorHandler from './src/middleware/error';
import * as expressWinston from 'express-winston';
import {ServerError} from './src/interfaces/interfaces';
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

//App
const app = express();
const debugLog = debug('app');
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 5000;
const routes: Array<RoutesConfig> = [];

//Connect to DB
connectDB(yellow);


app.use(cors());
app.use(express.json());
// routes.push(new UsersRoutes(app));
app.use(expressWinston.logger({
  transports: [
      new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
  )
}));
app.use(expressWinston.errorLogger({
  transports: [
      new winston.transports.Console()
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
  )
}));

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
app.use(ErrorHandler.getError);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('Api running!!!'));
}

//Server
const server = app.listen(PORT, () => {
  debugLog(blue, `Server running at http://localhost:${PORT}`);
  routes.forEach((route: RoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(blue, `Server has been started on port ${PORT}!`)
});

process.on('unhandledRejection', (err: ServerError) => {
  console.log(red,`MongoDB connection FAIL: ${err.message}`);
  server.close(() => process.exit(1));
});