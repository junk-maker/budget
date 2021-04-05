export default class AppService {
    _type = true;

    months() {
        return [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    };

    formatNumber(...args) {
        const [num, type] = args;
        const number = Math.abs(num).toFixed(2);
        const split = number.split('.');

        let int = split[0];

        if (int.length > 3) {
            int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
        }

        let dec = split[1];

        return (!type ? '-' : '+')  + ` ${int}.${dec}`;
    };

    calculateTotal(...args) {
        let sum = 0;
        const [arr] = args || [];
        arr.forEach(cur => {
            sum += cur.amount;
            // if (cur.date === new Date().getMonth()) {
            //     return sum += cur.value;
            // }
        })
        return sum;
    };

    calculateBudget(...args) {
        const [inc, exp, type] = args;
        const income = this.calculateTotal(inc);
        const expenses = this.calculateTotal(exp);
        const budget = income - expenses;


        if (budget > 0) {
            return this.formatNumber(budget, type);
        } else {
            return this.formatNumber(budget);
        }
    };

    budgetPercentage(...args) {
        const [inc, exp] = args;
        const income = this.calculateTotal(inc);
        const expenses = this.calculateTotal(exp);
        const percentage = Math.round((expenses / income) * 100);
    
        if (income <= 0 || percentage === 0) {
            return '---'
        }
        return `${percentage}%`;
    };

    inputLoop(...args) {
        const [schema, callback] = args;
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            return callback(idx, control);
        });
    };
};




// export const months = [
//     'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
//     'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
// ];

// export const formatNumber = (...args) => {
//     const [num, type] = args;
//     const number = Math.abs(num).toFixed(2);
//     const split = number.split('.');

//     let int = split[0];

//     if (int.length > 3) {
//         int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
//     }

//     let dec = split[1];

//     return (!type ? '-' : '+')  + ` ${int}.${dec}`;
// };

// export const calculateTotal = (...args) => {
//     let sum = 0;
//     const [arr] = args;
//     arr.forEach(cur => {
//         return sum += cur.amount;
//         // if (cur.date === new Date().getMonth()) {
//         //     return sum += cur.value;
//         // }
//     })
//     return sum;
// };


// export const calculateBudget = (...args) => {
//     const [inc, exp, type] = args;
//     const income = calculateTotal(inc);
//     const expenses = calculateTotal(exp);
//     const budget = income - expenses;

//     if (budget > 0) {
//         return formatNumber(budget, type);
//     } else {
//         return formatNumber(budget);
//     }
// };


// export const budgetPercentage = (...args) => {
//     const [inc, exp] = args;
//     const income = calculateTotal(inc);
//     const expenses = calculateTotal(exp);
//     const percentage = Math.round((expenses / income) * 100);

//     if (income <= 0 || percentage === 0) {
//         return '---'
//     }
//     return `${percentage}%`;
// };