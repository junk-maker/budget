import React, {useState ,useEffect} from 'react';
import {months, calculateBudget, calculateTotal, formatNumber, budgetPercentage} from '../../budget-library/library';

const Budget = () => {
    const state = {
        income: [{amount: 200}, {amount: 700}],
        expenses: [{amount: 100}, {amount: 300}],
        isActive: true
    };

    const {income, expenses, isActive} = state;
    const [date, setDate] = useState(new Date());
    const percentage = budgetPercentage(income, expenses);
    const budget = calculateBudget(income, expenses, isActive);
    const totalExpenses = formatNumber(calculateTotal(expenses));
    const totalIncome = formatNumber(calculateTotal(income), isActive);
    const displayDate = date.toLocaleTimeString().substr(0, 5);


    const dateSchema = {
        months,
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    };

    const valueSchema = {
        totalBudget: {
            name: 'общий бюджет',
            icon: '/icons/total.svg',
            display: budget
        },
        totalIncome: {
            name: 'доход',
            icon: '/icons/income.svg',
            display: totalIncome
        },
        totalExpenses: {
            name: 'расходы',
            icon: '/icons/expenses.svg',
            display: totalExpenses,
            percentage: percentage
        }
    };

    const displayTitle = props => {
        const {month, months, year} = props;
        return `${months[month]} ${year}`;
    };


    const displaySubtitle = props => {
        const newMonths = [];
        const {day, month, months, year} = props;

        months.forEach(w => {
            let newWord;
            if (w[w.length - 1] === 'ь') {
                newWord = w.replace(w[w.length - 1], 'я');
            } else if (w[w.length - 1] === 'т') {
                newWord = `${w}a`;
            } else {
                newWord = w.replace(w[w.length - 1], 'я');
            }
            return newMonths.push(newWord);
        });
        return `${day} ${newMonths[month]} ${year}`;
    };


    const tick = () => setDate(new Date());

    useEffect(() => {
        const interval = setInterval( () => tick(), 1000);
        return () => {
            clearInterval(interval);
        };
    });

    const valueRender = () => {
        return Object.keys(valueSchema).map((name, idx) => {
            const value  = valueSchema[name];

            return (
                <div className={'budget__main--all'} key={idx}>
                    <div className={'budget__main--box'}>
                        <img className={'budget__main--image'} src={value.icon} alt={value.name}/>
                    </div>

                    <div className={'budget__main--sum'}>
                        <span className={'budget__main--span'}>$</span>{value.display}
                    </div>
                    <div className={'budget__main--heading'}>{value.name}</div>
                    {value.percentage ? <div className={'budget__main--percentage'}>{value.percentage}</div> : null}
                </div>
            );
        });
    };



    return (
        <div className={'budget'}>
            <div className={'budget__header'}>
                <div className={'budget__header--title'}>Доступный бюджет на
                    <span className={'budget__header--month'}> {displayTitle(dateSchema)}</span>
                </div>

                <div className={'budget__header--subtitle'}>
                    {displayDate} | {displaySubtitle(dateSchema)} | валюта - Рубль (Rub)
                </div>
            </div>

            <div className={'budget__main'}>
                <div className={'budget__main--one'}/>
                <div className={'budget__main--two'}/>
                {valueRender()}
            </div>
        </div>
    );
};


export default Budget;