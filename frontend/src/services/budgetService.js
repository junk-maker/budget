import AppService from './appService';

export default class BudgetService {
    constructor() {
        this.appService = new AppService();
    };

    format(value, currency) {
        let coin = currency.currency;
        let locales = currency.locales;
        let sum = Array.isArray(value) ?
            this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value;

        return Intl.NumberFormat(locales, {style: 'currency', currency: coin}).format(sum);
    };

    budget(income, expenses, currency) {
        let budget = this.appService.calculateTotal(income, val => currency.locales === val.currency.locales) -
            this.appService.calculateTotal(expenses, val => currency.locales === val.currency.locales);

        return this.format(budget, currency);
    };

    percentage(income, value, currency) {
        let percentage = (Array.isArray(value) ?
            this.appService.calculateTotal(value, val => currency.locales === val.currency.locales) : +value) /
            this.appService.calculateTotal(income, val => currency.locales === val.currency.locales);
        let filter = income.filter(val => val.currency.currency === currency.currency);
        
        if(income <= 0 || percentage === 0 || isNaN(percentage) || filter.length === 0) {
            return '---';
        }

        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    };
};