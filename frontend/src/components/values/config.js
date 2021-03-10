import Income from '../income/Income';
import Expenses from '../expenses/Expenses';


export default class ValuesConfig {
    _type = true;
    getBudgetValue() {
        return {
            income: {
                description: <Income type={this._type}/>
            },
            expenses: {
                value: false,
                description: <Expenses type={!this._type}/>
            }
        }
    }
};