const Budget = require('../models/Budget');

const resJsonMessage = (res, data, statusCode) => {
    res.status(statusCode).json({data, success: true});
};

const resJsonData = async (req, res, statusCode) => {
    let user_id = req.user._id;
    let currency = req.user.currency;
    let data = await Budget.find({user_id});
    res.status(statusCode).json({data, currency, success: true});
};

module.exports = {resJsonData, resJsonMessage}