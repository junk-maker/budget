const Budget = require('../models/Budget');


const getBudget = async (req, res, next) => {
    try {
        await sendData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const addBudget = async (req, res, next) => {
    let user_id = req.user._id;
    let {value, currency, amount, category, description} = req.body;

    try {
        await Budget.create({user_id, value, currency, amount, category, description});
        await sendData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const getFeatures = async (req, res, next) => {
    //let features = 'Connect has been initialized';
    try {
        await sendData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const deleteBudget = async (req, res, next) => {
    let id = req.params.id;
    try {
        await Budget.findByIdAndDelete(id).exec();
        await sendData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};


const updateBudget = async (req, res, next) => {
    let {id, value, amount, currency, category, description} = req.body;
    let update = {id, value, amount, currency, category, description};
    let options = {new: true};

    try {
        await Budget.findByIdAndUpdate(id, update, options).exec();
        await sendData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};


const sendData = async (req, res, statusCode) => {
    let user_id = req.user._id;
    let currency = req.user.currency;
    let data = await Budget.find({user_id});
    res.status(statusCode).json({data, currency, success: true});
};


module.exports = {getBudget, addBudget, deleteBudget, getFeatures, updateBudget};