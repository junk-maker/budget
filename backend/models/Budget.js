const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        type: String,
        default: 'income',
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
});

const Budget = mongoose.model('budget', budgetSchema);
module.exports = Budget;