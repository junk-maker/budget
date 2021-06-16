const Budget = require('../models/Budget');

const getBudget = async (req, res, next) => {
    let user_id = req.user._id;
    try {
        let budget = await Budget.find({user_id});
        sendData(req, res, budget, 200);
    } catch (err) {
        return next(err);
    }
};

const postBudget = async (req, res, next) => {
    let user_id = req.user._id;
    let {coin, value, amount, category, description} = req.body;

    try {
        await Budget.create({user_id, coin, value, amount, category, description});
        let budget = await Budget.find({user_id});
        sendData(req, res, budget, 200);
    } catch (err) {
        return next(err);
    }
};

const getFeatures = (req, res, next) => {
    let features = 'Connect has been initialized';
    try {
        sendData(req, res, features, 200);
    } catch (err) {
        return next(err);
    }
};

const deleteBudget = async (req, res, next) => {
    let id = req.params.id;
    let user_id = req.user._id;
    try {
        await Budget.findByIdAndDelete(id).exec();
        let budget = await Budget.find({user_id});
        sendData(req, res, budget, 200);
    } catch (err) {
        return next(err);
    }
};


const updateBudget = async (req, res, next) => {
    let user_id = req.user._id;
    let {id, value, currency,  amount, category, description} = req.body;

    try {
        await Budget.findById(id, (err, update) => {
            if (err) {
                return next(err);
            }
            update.user_id = user_id;
            update.date = Date.now();
            update.value = value;
            update.currency = currency;
            update.amount = amount;
            update.category = category;
            update.description = description;
            update.save();
        }).exec();
        let budget = await Budget.find({user_id});
        sendData(req, res, budget, 200);
    } catch (err) {
        return next(err);
    }
};


const sendData = (req, res, data, statusCode) => {
    let currency = req.user.currency;
    res.status(statusCode).json({data, currency, success: true});
};


module.exports = {getBudget, postBudget, deleteBudget, getFeatures, updateBudget};