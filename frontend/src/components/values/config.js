import Income from '../income/Income';
import Expenses from '../expenses/Expenses';

export default class ValuesConfig {
    getBudgetValue(...args) {
        const [type] = args;
        return {
            income: {
                description: <Income type={type}/>,
            },
            expenses: {
                description: <Expenses type={!type}/>
            }
        };
    };
};