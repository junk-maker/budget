export default class BudgetService {
    totalAmount(value) {
        return value.filter(val => new Date(val.date).getMonth() === new Date().getMonth())
            .reduce((total, cur) => total + Number(cur.amount), 0);
    };

    format(value, currency) {
        let coin = currency ? currency.currency : 'RUB';
        let locales = currency ? currency.locales : 'ru-RU';
        let sum = Array.isArray(value) ? this.totalAmount(value) : Number(value);
        return Intl.NumberFormat(locales, {style: 'currency', currency: coin}).format(sum);
    };

    budget(income, expenses, currency) {
        let budget = this.totalAmount(income) - this.totalAmount(expenses);
        return this.format(budget, currency);
    };

    percentage(income, value) {
        let percentage = (Array.isArray(value) ? this.totalAmount(value) : Number(value)) / this.totalAmount(income);
        if(income <= 0 || percentage === 0 || isNaN(percentage)) {
            return '---';
        }
        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    };
};