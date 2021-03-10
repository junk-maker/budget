require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const budgetRoutes = require('./routes/budgetRoutes');


//App and port
const app = express();
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB(red, yellow);



app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'API running...'});
});



app.use('/api/budget', budgetRoutes);


//Server
app.listen(PORT, () => console.log(blue, `Server has been started on port ${PORT}!`));