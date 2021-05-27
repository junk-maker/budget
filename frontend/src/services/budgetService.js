export const BudgetService = {
    calculate(value) {
        let sum = 0;
        for (let cur of value) {
            sum += Number(cur.amount);
        }
        return sum;
    },

    format(value) {
        let sum = Array.isArray(value) ? this.calculate(value) : Number(value);
        return Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(sum);
    },

    budget(income, expenses) {
        let budget = this.calculate(income) - this.calculate(expenses);
        return this.format(budget);
    },

    percentage(income, value) {
        let percentage = (Array.isArray(value) ? this.calculate(value) : Number(value)) / this.calculate(income);
        if(income <= 0 || percentage === 0 || isNaN(percentage)) {
            return '---';
        }
        return Intl.NumberFormat(undefined, {style: 'percent'}).format(percentage);
    }
};