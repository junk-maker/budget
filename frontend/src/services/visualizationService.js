import AppService from './appService';

export default class VisualizationService {
    constructor(type, income, expenses, currency) {
        this.type = type;
        this.income = income;
        this.expenses = expenses;
        this.currency = currency;
        this.appService = new AppService();

    };

    pieData() {
        return this.sortData(this.expenses);
    };

    doubleData() {
        let income = this.sortData(this.income);
        let expenses = this.sortData(this.expenses);

        let incomeData = this.getData('Доход');
        let expensesData = this.getData('Расходы');

        this.mergeData(incomeData, income, this.appService.months(), 'Доход');
        this.mergeData(expensesData, expenses, this.appService.months(),  'Расходы');

        return incomeData.concat(expensesData);
    };

    balanceData() {
        let data = this.getData();
        let incomeData = this.getData();
        let expensesData = this.getData();

        let balance = (data, months, income, expenses) => {
            data.forEach((val, idx) => {
                if (expenses[idx].value > 0) {
                    data.splice(idx, 1, {month: months[idx], value: income[idx].value - expenses[idx].value})
                }
            });
        };

        this.mergeData(incomeData, this.sortData(this.income), this.appService.months(), 'Доход');
        this.mergeData(expensesData, this.sortData(this.expenses), this.appService.months(),  'Расходы');
        balance(data, this.appService.months(), incomeData, expensesData);

        return data;
    };

    sortData(value) {
        return value.filter(cur => cur.currency.currency === this.currency.currency)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    getData(string) {
        return this.appService.months().map(m => {
            if(!string) {
                return {month: m, value: 0};
            } else {
                return {month: m, value: 0, type: string};
            }
        });
    };

    mergeData(data, value, months, string) {
        let sum = 0;
        return data.map((d, idx) => value.forEach(val => {
            if (idx === new Date(val.date).getMonth()) {
                data.splice(idx, 1, {
                    type: string,
                    month: months[idx],
                    value: new Date(val.date).getMonth() === new Date().getMonth() ? sum += +val.amount: +val.amount
                });
            }
        }));
    };
};