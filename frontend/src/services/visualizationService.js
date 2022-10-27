import AppService from './appService';

export default class VisualizationService {
    constructor(type, income, language, expenses, monthesNames, currency) {
        this.type = type;
        this.income = income;
        this.language = language;
        this.expenses = expenses;
        this.currency = currency;
        this.monthesNames = monthesNames;
        this.appService = new AppService();

    };

    pieData() {
        return this.expenses.filter(val => val.currency.currency === this.currency.currency);
    };

    getMonth() {
        let arr = [];
        this.monthesNames.map(val => arr.push(val.month));
        return arr;
    };

    sortData(value) {
        return value.filter(cur => cur.currency.currency === this.currency.currency)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    getData(string) {
        return  this.monthesNames.map(m => {
            if(!string) {
                return {month: m.month, value: 0};
            } else {
                return {month: m.month, value: 0, type: string};
            };
        });
    };

    doubleData(language) {
        let income = this.sortData(this.income);
        let expenses = this.sortData(this.expenses);

        let incomeData = this.getData(this.getTitle('Доход', 'Income', language));
        let expensesData = this.getData(this.getTitle('Расходы', 'Expenses', language));

        this.mergeData(incomeData, income, this.getMonth(), this.getTitle('Доход', 'Income', language));
        this.mergeData(expensesData, expenses, this.getMonth(),  this.getTitle('Расходы', 'Expenses', language));

        return incomeData.concat(expensesData);
    };

    balanceData(language) {
        let data = this.getData();
        let incomeData = this.getData();
        let expensesData = this.getData();

        let balance = (data, months, income, expenses) => {
            data.forEach((_, idx) => {
                if (expenses[idx].value > 0) {
                    data.splice(idx, 1, {month: months[idx], value: income[idx].value - expenses[idx].value});
                } else {
                    data.splice(idx, 1, {month: months[idx], value: income[idx].value});
                };
            });
        };

        this.mergeData(incomeData, this.sortData(this.income), this.getMonth(), this.getTitle('Доход', 'Income', language));
        this.mergeData(expensesData, this.sortData(this.expenses), this.getMonth(),  this.getTitle('Расходы', 'Expenses', language));
        balance(data, this.getMonth(), incomeData, expensesData);

        return data;
    };

    monthsSwitch(type, value) {
        return {
            0: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            1: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            2: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            3: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            4: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            5: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            6: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            7: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            8: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            9: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            10: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
            11: this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth()),
        };
    };

    getTitle(first, second, language) {
        return this.appService.checkLanguage(language) ? first : second;
    };

    mergeData(data, value, months, string) {
        return data.map((_, idx) => value.forEach(val => {
            if (idx === new Date(val.date).getMonth()) {
                data.splice(idx, 1, {
                    type: string,
                    month: months[idx],
                    value: this.monthsSwitch(new Date(val.date).getMonth(), value)[new Date(val.date).getMonth()],
                });
            };
        }));
    };
};