import Income from '../income/Income';
import Expenses from '../expenses/Expenses';

export function getBudgetValue () {
    return {
        income: {
            description: <Income/>
        },
        expenses: {
            description: <Expenses/>
        }
    }
}