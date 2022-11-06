import mongoose from 'mongoose';

const connectDB = async (yellow: string) => await mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log(yellow,'MongoDB connection SUCCESS!'))
;

export default connectDB;
