const Budget = require('../models/Budget');
const {resJsonData} = require('../services/helperService');


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

    try {
        await Budget.create({user_id, value, currency, amount, category, description});
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const deleteBudget = async (req, res, next) => {
    let id = req.params.id;
    try {
        await Budget.findByIdAndDelete(id).exec();
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

const editBudget = async (req, res, next) => {
    let options = {new: true};
    let {id, value, amount, currency, category, description} = req.body;
    let edit = {id, value, amount, currency, category, description};

    try {
        await Budget.findByIdAndUpdate(id, edit, options).exec();
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};


module.exports = {getBudget, addBudget, editBudget, deleteBudget};