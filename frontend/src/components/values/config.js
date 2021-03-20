import Income from '../income/Income';
import Expenses from '../expenses/Expenses';
import HelperService from '../../budget-service/helperService';

export default class ValuesConfig {
    helper = new HelperService();
    getBudgetValue() {
        return {
            income: {
                description: <Income type={this.helper._type}/>,
            },
            expenses: {
                description: <Expenses type={!this.helper._type}/>
            }
        };
    };
};