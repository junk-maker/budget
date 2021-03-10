const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Boolean,
        default: true,
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
// const Income = mongoose.model('income', budgetSchema);
// const Expenses = mongoose.model('expenses', budgetSchema);
// module.exports = {Income, Expenses};
module.exports = Budget;