const mongoose = require('mongoose');

const connectDB = async yellow => {
    await mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    console.log(yellow,'MongoDB connection SUCCESS!');
};


module.exports = connectDB;
