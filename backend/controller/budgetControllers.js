const Budget = require('../models/Budget');

const getBudget = async (req, res) => {
    try {
        const budget = await Budget.find({});
        res.json(budget);
    } catch (e) {
        console.error(e);
        res.status(500).json({messsage: 'Server error'});
    }
};

module.exports = getBudget;