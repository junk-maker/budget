export default class BudgetService {
    format(value, currency) {
        let coin = currency.currency;
        let locales = currency.locales;
        let sum = Array.isArray(value) ? this.totalAmount(value, locales) : Number(value);
        return Intl.NumberFormat(locales, {style: 'currency', currency: coin}).format(sum);
    };

    totalAmount(value, locales) {
        return value.filter(val => locales === val.currency.locales)
            .reduce((total, cur) => total + Number(cur.amount), 0);
    };

    budget(income, expenses, currency) {
        let budget = this.totalAmount(income, currency.locales) - this.totalAmount(expenses, currency.locales);
        return this.format(budget, currency);
    };

    percentage(income, value, currency) {
        let percentage = (Array.isArray(value) ? this.totalAmount(value, currency.locales) : Number(value)) / this.totalAmount(income, currency.locales);
        if(income <= 0 || percentage === 0 || isNaN(percentage)) {
            return '---';
        }
        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    };
};