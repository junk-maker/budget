const mongoose = require('mongoose');

const reqString = string => {
    return {
        type: String,
        required: [true, `${string}`]
    }
};

const budgetSchema = new mongoose.Schema({
    user_id: reqString('Please provide user id'),
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        id: reqString('Please provide value id'),
        description: reqString('Please provide description'),
        type : reqString('Please provide type'),
        translate: reqString('Please provide translate')
    },
    currency: {
        id: reqString('Please provide currency id'),
        symbol: reqString('Please provide symbol'),
        currency: reqString('Please provide currency'),
        locales: reqString('Please provide locales'),
        translate: reqString('Please provide locales'),
    },
    amount: reqString('Please provide amount'),
    category: reqString('Please provide category'),
    description: reqString('Please provide description')
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;