const Budget = require('../models/Budget');
const ErrorService = require('../services/errorService');
const {jsonResponseData} = require('../services/sendDataService');

const getBudget = async (req, res, next) => {
    try {
        await jsonResponseData(req, res, 200);
    } catch (err) {
        return next(err);
    };
};

const addItem = async (req, res, next) => {
    const user_id = req.user._id;
    const {value, currency, amount, category, description} = req.body;

    if (!value || !currency || !amount || !category || !description) {
        return next(new ErrorService('Please provide data', 400));
    };

    if (!user_id) {
        return next(new ErrorService('User is not found', 401));
    };

    try {
        await Budget.create({user_id, value, currency, amount, category, description});
        await jsonResponseData(req, res, 201);
    } catch (err) {
        return next(err);
    };
};

const deleteItem = async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
        return next(new ErrorService('None id', 401));
    };

    try {
        await Budget.findByIdAndDelete(id).exec();
        await jsonResponseData(req, res, 201);
    } catch (err) {
        return next(err);
    };
};

const editItem = async (req, res, next) => {
    let options = {new: true};
    const {id, value, amount, currency, category, description} = req.body;
    let edit = {id, value, amount, currency, category, description};

    if (!id || !value || !amount || !currency || !category || !description) {
        return next(new ErrorService('Please provide data', 400));
    };

    try {
        await Budget.findByIdAndUpdate(id, edit, options).exec();
        await jsonResponseData(req, res, 201);
    } catch (err) {
        return next(err);
    };
};

module.exports = {addItem, editItem, getBudget, deleteItem};