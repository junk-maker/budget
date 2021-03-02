require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (...args) => {
    const [red, yellow] = args;
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(yellow,'MongoDB connection SUCCESS!');
    } catch (error) {
        console.error(red,'MongoDB connection FAIL');
        process.exit(1);
    }
};


module.exports = connectDB;
