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

const getBudgetByValue = async (req, res) => {
    let budget;
    try {
        if (req.params.value === 'income') {
            budget = await Budget.find({value: req.params.value}); 
        } else {
            budget = await Budget.find({value: req.params.value}); 
        };

        res.json(budget);
    } catch (e) {
        console.error(e);
        res.status(500).json({messsage: 'Server error'});
    }
};

module.exports = {getBudget, getBudgetByValue};