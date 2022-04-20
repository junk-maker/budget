const path = require('path');
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config({path: './config.env'});
const errorHandler = require('./middleware/error');
const authRoutes = require('./routers/routerForAuth');
const budgetRoutes = require('./routers/routerForBudget');
const contactRoutes = require('./routers/routerForContact');
const featuresRoutes = require('./routers/routerForFeatures');
const settingsRoutes = require('./routers/routerForSettings');
const statisticRoutes = require('./routers/routerForStatistics');
const verifyEmailRoutes = require('./routers/routerForVerifyEmail');
const resetPasswordRoutes = require('./routers/routerForPasswordReset');
const activateEmailRoutes = require('./routers/routerForEmailActivation');
const recoverPasswordRoutes= require('./routers/routerForPasswordRecovery');

//App and port
const app = express();
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB(yellow);


app.use(cors());
app.use(express.json());

// Connecting Routes
app.use('/api/auth', authRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/budget', contactRoutes);
app.use('/api/budget', featuresRoutes);
app.use('/api/budget', settingsRoutes);
app.use('/api/budget', statisticRoutes);
app.use('/api/auth', verifyEmailRoutes);
app.use('/api/auth', activateEmailRoutes);
app.use('/api/auth', resetPasswordRoutes);
app.use('/api/auth', recoverPasswordRoutes);

// Error Handler Middleware
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('Api running!!!'));
}

//Server
const server = app.listen(PORT, () => console.log(blue, `Server has been started on port ${PORT}!`));

process.on('unhandledRejection', err => {
  console.log(red,`MongoDB connection FAIL: ${err.message}`);
  server.close(() => process.exit(1));
});