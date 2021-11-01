import AppService from './appService';

export default class VisualizationService {
    constructor(type, income, monthId, language, expenses, currency) {
        this.type = type;
        this.income = income;
        this.monthId = monthId;
        this.language = language;
        this.expenses = expenses;
        this.currency = currency;
        this.appService = new AppService();

    };

    pieData() {
        return this.expenses.filter(val =>
            this.monthId === new Date(val.date).getMonth() && val.currency.currency === this.currency.currency);
    };

    sortData(value) {
        return value.filter(cur => cur.currency.currency === this.currency.currency)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    getData(string) {
        return this.appService.months(this.language).map(m => {
            if(!string) {
                return {month: m, value: 0};
            } else {
                return {month: m, value: 0, type: string};
            }
        });
    };

    doubleData(language) {
        let income = this.sortData(this.income);
        let expenses = this.sortData(this.expenses);

        let incomeData = this.getData(this.getTitle('Доход', 'Income', language));
        let expensesData = this.getData(this.getTitle('Расходы', 'Expenses', language));

        this.mergeData(incomeData, income, this.appService.months(this.language), this.getTitle('Доход', 'Income', language));
        this.mergeData(expensesData, expenses, this.appService.months(this.language),  this.getTitle('Расходы', 'Expenses', language));

        return incomeData.concat(expensesData);
    };

    balanceData(language) {
        let data = this.getData();
        let incomeData = this.getData();
        let expensesData = this.getData();

        let balance = (data, months, income, expenses) => {
            data.forEach((val, idx) => {
                if (expenses[idx].value > 0) {
                    data.splice(idx, 1, {month: months[idx], value: income[idx].value - expenses[idx].value});
                } else {
                    data.splice(idx, 1, {month: months[idx], value: income[idx].value});
                }
            });
        };

        this.mergeData(incomeData, this.sortData(this.income), this.appService.months(this.language), this.getTitle('Доход', 'Income', language));
        this.mergeData(expensesData, this.sortData(this.expenses), this.appService.months(this.language),  this.getTitle('Расходы', 'Expenses', language));
        balance(data, this.appService.months(this.language), incomeData, expensesData);

        return data;
    };

    monthsSwitch (type, value) {
        switch (type) {
            case 0:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 1:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 2:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 3:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 4:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 5:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 6:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 7:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 8:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 9:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 10:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            case 11:
                return this.appService.calculateTotal(value, val => type === new Date(val.date).getMonth());
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    getTitle(first, second, language) {
        return this.appService.checkLanguage(language) ? first : second
    };

    mergeData(data, value, months, string) {
        return data.map((d, idx) => value.forEach(val => {
            if (idx === new Date(val.date).getMonth()) {
                data.splice(idx, 1, {
                    type: string,
                    month: months[idx],
                    value: this.monthsSwitch(new Date(val.date).getMonth(), value)
                });
            }
        }));
    };
};