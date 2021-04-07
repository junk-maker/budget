import React, {useState ,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../services/appService';
import {fetchBudget} from '../../redux/actions/budgetActions';
import Spinner from '../ui/spinner/Spinner';


const Budget = () => {
    const app = new AppService();
    const dispatch = useDispatch();
    const budgetActions =  useSelector(state => state.getBudget);
    const {loading, income, expenses} = budgetActions;
    
    useEffect(() => {
        dispatch(fetchBudget());
    }, [dispatch]);

    const months = app.months();
    const [date, setDate] = useState(new Date());
    const displayDate = date.toLocaleTimeString().substr(0, 5);
    const percentage = app.budgetPercentage(income, expenses);
    const budget = app.calculateBudget(income, expenses, app._type);
    const totalExpenses = app.formatNumber(app.calculateTotal(expenses));
    const totalIncome = app.formatNumber(app.calculateTotal(income), app._type);
    
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
        return () => clearInterval(interval);
    });

    const createValue = (...args) => {
        const [idx, name, control] = args;
        return (
            <div className={'budget__main--all'} key={idx + name}>
                <div className={'budget__main--box'}>
                    <img className={'budget__main--image'} src={control.icon} alt={control.name}/>
                </div>

                <div className={'budget__main--sum'}>
                    <span className={'budget__main--span'}>$</span>{control.display}
                </div>
                <div className={'budget__main--heading'}>{control.name}</div>
                {control.percentage ? <div className={'budget__main--percentage'}>{control.percentage}</div> : null}
            </div>
        );
    };

    const valueRender = () => app.objectIteration(valueSchema, createValue);

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

            {
                loading ? <Spinner/> : 
                    <div className={'budget__main'}>
                        <div className={'budget__main--one'}/>
                        <div className={'budget__main--two'}/>
                            {valueRender()}
                    </div>
            }

            
        </div>
    );
};


export default Budget;