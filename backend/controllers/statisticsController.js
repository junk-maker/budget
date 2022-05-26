const {jsonResponseData} = require('../services/sendDataService');

const getStatistics = async (req, res, next) => {
    try {
        await jsonResponseData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getStatistics}