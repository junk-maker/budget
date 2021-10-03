const Budget = require('../models/Budget');


const resJsonMessage = (res, data, statusCode) => {
    res.status(statusCode).json({data, success: true});
};

const resJsonData = async (req, res, statusCode) => {
    let user_id = req.user._id;
    let data = await Budget.find({user_id});
    res.status(statusCode).json({data, user_id, success: true});
};

const sendToken = (res, user, statusCode) => {
    let token = user.getSignedJwtToken();
    res.status(statusCode).json({token, success: true});
};


module.exports = {sendToken, resJsonData, resJsonMessage}