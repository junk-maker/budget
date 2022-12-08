"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const budgetSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: [true, 'Please provide user id'] },
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        id: { type: String, required: [true, 'Please provide value id'] },
        type: { type: String, required: [true, 'Please provide value id'] },
        translate: { type: String, required: [true, 'Please provide translate'] },
        description: { type: String, required: [true, 'Please provide description'] },
    },
    currency: {
        symbol: { type: String, required: [true, 'Please provide symbol'] },
        id: { type: String, required: [true, 'Please provide currency id'] },
        locales: { type: String, required: [true, 'Please provide locales'] },
        currency: { type: String, required: [true, 'Please provide currency'] },
        translate: { type: String, required: [true, 'Please provide translate'] },
    },
    amount: { type: String, required: [true, 'Please provide amount'] },
    category: { type: String, required: [true, 'Please provide category'] },
    description: { type: String, required: [true, 'Please provide description'] },
});
exports.default = (0, mongoose_1.model)('budget', budgetSchema);
