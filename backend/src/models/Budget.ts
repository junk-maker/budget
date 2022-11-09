import {Budget} from '../types/types';
import {model, Schema} from 'mongoose';

const budgetSchema = new Schema<Budget>({
    user_id: {type: Schema.Types.ObjectId, required: [true, 'Please provide user id']},
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        id: {type: String, required: [true, 'Please provide value id']},
        type: {type: String, required: [true, 'Please provide value id']},
        translate: {type: String, required: [true, 'Please provide translate']},
        description: {type: String, required: [true, 'Please provide description']},
    },
    currency: {
        symbol: {type: String, required: [true, 'Please provide symbol']},
        id: {type: String, required: [true, 'Please provide currency id']},
        locales: {type: String, required: [true, 'Please provide locales']},
        currency: {type: String, required: [true, 'Please provide currency']},
        translate: {type: String, required: [true, 'Please provide translate']},
    },
    amount: {type: String, required: [true, 'Please provide amount']},
    category: {type: String, required: [true, 'Please provide category']},
    description: {type: String, required: [true, 'Please provide description']},
});

const Budget = model<Budget>('budget', budgetSchema);

export default Budget;