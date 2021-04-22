export default class GetBudget {
    constructor (type, value) {
        this.type = type;
        this.value = value;

    }

    static formatNumber(arg, type) {
        let localNum = typeof arg === 'object' ? this.calculateTotal(arg.value) : +arg;
        let localType = typeof arg === 'object' ? arg.type : arguments.length === 2 ? type : true;

        const number = Math.abs(localNum).toFixed(2);
        const split = number.split('.');

        let int = split[0];

        if (int.length > 3) {
            int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
        }

        let dec = split[1];

        return (!localType ? '-' : '+')  + `${int}.${dec}`;
    };

    static calculateTotal(arr) {
        let sum = 0;
        let localArr = arr || [];

        localArr.forEach(cur => {
            sum += cur.amount;
            // if (cur.date === new Date().getMonth()) {
            //     return sum += cur.value;
            // }
        })
        return sum;
    };

    static calculateBudget(income, expenses) {
        const localIncome = this.calculateTotal(income.value);
        const localExpenses = this.calculateTotal(expenses.value);
        const budget = localIncome - localExpenses;
        return this.formatNumber(budget);
        // if (budget > 0) {
        //     return this.formatNumber(budget);
        // } else {
        //     return this.formatNumber(budget);
        // }
    };

    static budgetPercentage(income, expenses) {
        const localIncome = this.calculateTotal(income.value);
        const localExpenses = this.calculateTotal(expenses.value);
        const percentage = Math.round((localExpenses / localIncome) * 100);

        if (income.value <= 0 || percentage === 0) {
            return '---'
        }
        return `${percentage}%`;
    };

    static itemPercentage(income, amount) {
        const localIncome = this.calculateTotal(income);
        const percentage = Math.round((amount / localIncome) * 100);

        if(income.value <= 0 || percentage === 0) {
            return '---'
        }
        return `${percentage}%`;
    };
}