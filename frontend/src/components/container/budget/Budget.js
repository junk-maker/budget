import Modal from '../../modal/Modal';
import Tabs from '../../presentation/tabs/Tabs';
import React, {useState ,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Income from '../../presentation/income/Income';
import AppService from '../../../services/appService';
import GetBudget from '../../../services/budgetService';
import Expenses from '../../presentation/expenses/Expenses';
import {fetchBudget} from '../../../redux/actions/budgetActions';
import CircleLoader from '../../presentation/ui/bounce-loader/BounceLoader';



const Budget = () => {
    const app = new AppService();
    const dispatch = useDispatch();
    const budgetActions =  useSelector(state => state.getBudget);
    const {loading, income, expenses} = budgetActions;
    
    useEffect(() => {
        dispatch(fetchBudget());
    }, [dispatch]);

    const tabItems = [
        {name: 'Бюджет', openTab: 0},
        {name: 'Доходы', openTab: 1,},
        {name: 'Расходы', openTab: 2,}
    ];

    const [active, setActive] = useState(false);
    const [date, setDate] = useState(new Date());
    const totalIncome = new GetBudget(app._type, income);
    const [tabs, setTabs] = useState(tabItems[0].openTab);
    const totalExpenses = new GetBudget(!app._type, expenses);
    const budget = GetBudget.calculateBudget(totalIncome, totalExpenses);
    const displayDate = date.toLocaleTimeString().substr(0, 5);
    const percentage = GetBudget.budgetPercentage(totalIncome, totalExpenses);

    const totalSchema = {
        totalBudget: {
            name: 'общий бюджет',
            icon: '/icons/total.svg',
            display: budget
        },
        totalIncome: {
            name: 'доход',
            icon: '/icons/income.svg',
            display: GetBudget.formatNumber(totalIncome)
        },
        totalExpenses: {
            name: 'расходы',
            icon: '/icons/expenses.svg',
            display: GetBudget.formatNumber(totalExpenses),
            percentage: percentage
        }
    };

    const tick = () => setDate(new Date());

    useEffect(() => {
        const interval = setInterval( () => tick(), 1000);
        return () => clearInterval(interval);
    });

    const openModalHandler = (...args) => {
        const [active] = args;
        setActive(!active);
    };

    const createValue = (...args) => {
        const [idx, name, control] = args;
        return (
            <div className={'budget__total--all'} key={idx + name}>
                <div className={'budget__total--box'}>
                    <img className={'budget__total--image'} src={control.icon} alt={control.name}/>
                </div>

                <div className={'budget__total--sum'}>
                    <span className={'budget__total--span'}>$</span>{control.display}
                </div>
                <div className={'budget__total--heading'}>{control.name}</div>
                {control.percentage ? <div className={'budget__total--percentage'}>{control.percentage}</div> : null}
            </div>
        );
    };

    const valueRender = () => app.objectIteration(totalSchema, createValue);

    return (
       <>
           <div className={'budget'}>
               <div className={'budget__header'}>
                   <div className={'budget__header--title'}>Доступный бюджет на
                       <span className={'budget__header--month'}> {app.displayTitle()}</span>
                   </div>

                   <div className={'budget__header--subtitle'}>
                       {displayDate} | {app.displaySubtitle()} | валюта - Рубль (Rub)
                   </div>
               </div>

               <Tabs
                   setTabs={setTabs}
                   tabItems={tabItems}
                   onClick={() => openModalHandler(active)}
               />

               {
                   loading ? <CircleLoader/> :
                       <div className={'budget__box'}>
                           {
                               tabs === 0 && <div className={'budget__total'}>
                                   <div className={'budget__total--one'}/>
                                   <div className={'budget__total--two'}/>
                                   {valueRender()}
                               </div>
                           }
                           <div className={'budget__value'}>
                               {
                                   tabs === 1 && <Income
                                       value={income}
                                       type={app._type}
                                   />
                               }
                               {
                                   tabs === 2 && <Expenses
                                       income={income}
                                       value={expenses}
                                       type={!app._type}
                                   />
                               }
                           </div>
                       </div>
               }
           </div>

           <Modal
               active={active}
               setActive={setActive}
           />
       </>
    );
};


export default Budget;