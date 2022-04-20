const {resJsonData} = require('../services/sendDataService');

const getStatistics = async (req, res, next) => {
    try {
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getStatistics}