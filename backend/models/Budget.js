const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        description :{
            type: String,
            required: true
        },
        type : {
            type: String,
            required: true
        }
    },
    currency: {
        symbol: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        locales: {
            type: String,
            required: true
        }
    },
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentMonth: {
        type: String,
        required: true
    }
});

const Budget = mongoose.model('budget', budgetSchema);

module.exports = Budget;