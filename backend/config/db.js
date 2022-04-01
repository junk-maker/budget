const mongoose = require('mongoose');

const connectDB = async yellow => await mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(yellow,'MongoDB connection SUCCESS!'));

module.exports = connectDB;
