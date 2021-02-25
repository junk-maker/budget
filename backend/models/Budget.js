const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    myBudget: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            amount: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ]
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;