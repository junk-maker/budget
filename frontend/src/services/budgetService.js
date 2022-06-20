import AppService from './appService';

export default class BudgetService {
    constructor() {
        this.appService = new AppService();
    };

    format(value, currency) {
        const coin = currency.currency;
        const locales = currency.locales;
        const sum = Array.isArray(value) ?
            this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value;

        return Intl.NumberFormat(locales, {style: 'currency', currency: coin}).format(sum);
    };

    budget(income, expenses, currency) {
        const budget = this.appService.calculateTotal(income, val => currency.locales === val.currency.locales) -
            this.appService.calculateTotal(expenses, val => currency.locales === val.currency.locales);

        return this.format(budget, currency);
    };

    percentage(income, value, currency) {
        const percentage = (Array.isArray(value) ?
            this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value) /
            this.appService.calculateTotal(income, val => currency.locales === val.currency.locales);
        const filter = income.filter(val => val.currency.currency === currency.currency);
        
        if(income <= 0 || percentage === 0 || isNaN(percentage) || filter.length === 0) {
            return '---';
        }

        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    };
};