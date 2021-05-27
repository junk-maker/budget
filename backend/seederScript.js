  
require('dotenv').config();
const connectDB = require('./config/db');
const Budget = require('./models/Budget');
//const Expenses = require('./models/Budget');
const income = require('./data/income');
const expenses = require('./data/expenses');

connectDB();

const importData = async (doc, options) => {
  try {
    // await Budget.deleteMany({});
    // await Expenses.deleteMany({});

    await Budget.insertMany(income);
    await Budget.insertMany(expenses);

    console.log('Data Import Success');

    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();