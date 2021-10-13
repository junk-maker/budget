const {resJsonMessage} = require('../services/sendDataService');

const getFeatures = async (req, res, next) => {
    let features = 'Connect has been initialized';
    try {
        resJsonMessage(res, features, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getFeatures};