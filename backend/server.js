//const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/error');
const budgetRoutes = require('./routes/budgetRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config({path: './config.env'});
const featuresRoutes = require('./routes/featuresRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const statisticRoutes = require('./routes/statisticRoutes');
const verifyEmailRoutes = require('./routes/verifyEmailRoutes');
const activateEmailRoutes = require('./routes/activateEmailRoutes');
const resetPasswordRoutes = require('./routes/resetPasswordRoutes');
const recoverPasswordRoutes= require('./routes/recoverPasswordRoutes');

//App and port
const app = express();
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB(yellow);


// app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

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

//Server
const server = app.listen(PORT, () => console.log(blue, `Server has been started on port ${PORT}!`));

process.on('unhandledRejection', (err) => {
  console.log(red,`MongoDB connection FAIL: ${err.message}`);
  server.close(() => process.exit(1));
});