const {resJsonData} = require('../services/sendDataService');

const getStatistic = async (req, res, next) => {
    try {
        await resJsonData(req, res, 200);
    } catch (err) {
        return next(err);
    }
};

module.exports = {getStatistic}