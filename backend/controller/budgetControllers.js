const Budget = require('../models/Budget');
const {resJsonData} = require('../services/sendDataService');
const ErrorService = require('../services/errorService');

const getBudget = async (req, res, next) => {
    try {
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const addBudget = async (req, res, next) => {
    let user_id = req.user._id;
    let {value, currency, amount, category, description} = req.body;

    if (!value || !currency || !amount || !category || !description) {
        return next(new ErrorService('Please provide data', 400));
    }

    if (!user_id) {
        return next(new ErrorService('User is not found', 401));
    }

    try {
        await Budget.create({user_id, value, currency, amount, category, description});
        await resJsonData(req, res, 201);
    } catch (err) {
        return next(err);
    }
};

const deleteBudget = async (req, res, next) => {
    let id = req.params.id;

     if (!id) {
        return next(new ErrorService('None id', 401));
    }

    try {
        await Budget.findByIdAndDelete(id).exec();
        await resJsonData(req, res, 201);
    } catch (err) {
        return next(err);
    }
};

const editBudget = async (req, res, next) => {
    let options = {new: true};
    let {id, value, amount, currency, category, description} = req.body;
    let edit = {id, value, amount, currency, category, description};

    if (!id || !value || !amount || !currency || !category || !description) {
        return next(new ErrorService('Please provide data', 400));
    }

    try {
        await Budget.findByIdAndUpdate(id, edit, options).exec();
        await resJsonData(req, res, 201);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getBudget, addBudget, editBudget, deleteBudget};