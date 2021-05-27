const Budget = require('../models/Budget');

const getBudget = async (req, res, next) => {
    try {
        let budget = await Budget.find({});
        sendData(res, budget, 200);
    } catch (err) {
        return next(err);
        // res.status(500).json({message: 'Server error'});
    }
};

const postBudget = async (req, res, next) => {
    const {value, amount, category, description} = req.body;

    try {
        let budget = await Budget.create({value, amount, category, description});
        sendData(res, budget, 200);
    } catch (err) {
        return next(err);
    }
};

const getFeatures = (req, res, next) => {
    let features = 'Connect has been initialized';
    try {
        sendData(res, features, 200);
    } catch (err) {
        return next(err);
    }
};

const deleteBudget = async (req, res, next) => {};


const sendData = (res, data, statusCode) => {
    res.status(statusCode).json({data, success: true});
};


module.exports = {getBudget, postBudget, deleteBudget, getFeatures};