export const BudgetService = {
    totalAmount(value) {
        return value.reduce((total, cur) => total + cur.amount, 0);
    },

    format(value) {
        let sum = Array.isArray(value) ? this.totalAmount(value) : Number(value);
        return Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(sum);
    },

    budget(income, expenses) {
        let budget = this.totalAmount(income) - this.totalAmount(expenses);
        return this.format(budget);
    },

    percentage(income, value) {
        let percentage = (Array.isArray(value) ? this.totalAmount(value) : Number(value)) / this.totalAmount(income);
        if(income <= 0 || percentage === 0 || isNaN(percentage)) {
            return '---';
        }
        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    }
};