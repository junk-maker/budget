const {jsonResponseMessage} = require('../services/sendDataService');

const getFeatures = async (req, res, next) => {
    try {
        jsonResponseMessage(res, 'Connect has been initialized', 200);
    } catch (err) {
        return next(err);
    };
};

module.exports = {getFeatures};