import AddData from '../add-data/AddData';
import AddPopup from '../popup/AddPopup';
import ErrorPopup from '../popup/ErrorPopup';
import Tabs from '../../presentation/tabs/Tabs';
import React, {useState ,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Income from '../../presentation/income/Income';
import AppService from '../../../services/appService';
import Expenses from '../../presentation/expenses/Expenses';
import {BudgetService} from '../../../services/budgetService';
import {fetchBudget} from '../../../redux/actions/budgetActions';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';




const Budget = () => {
    const budgetActions =  useSelector(state => state.getBudget);
    const {loading, income, expenses, error} = budgetActions;
    const budgetService = BudgetService;
    const service = new AppService();
    const dispatch = useDispatch();
    const app = new AppService();

    useEffect(() => {
        dispatch(fetchBudget(setModalWindowOpen));
    }, [dispatch]);

    const tabItems = [
        {name: 'Бюджет', openTab: 0},
        {name: 'Доходы', openTab: 1,},
        {name: 'Расходы', openTab: 2,}
    ];

    const budgetError = true;
    const [date, setDate] = useState(new Date());
    const [active, setActive] = useState(false);
    const [tabs, setTabs] = useState(tabItems[0].openTab);
    const [modalWindowOpen, setModalWindowOpen] = useState(false);

    const totalSchema = {
        totalBudget: {
            name: 'общий бюджет',
            icon: '/icons/total.svg',
            display: budgetService.budget(income, expenses)
        },
        totalIncome: {
            name: 'доход',
            icon: '/icons/income.svg',
            display: budgetService.format(income)
        },
        totalExpenses: {
            name: 'расходы',
            icon: '/icons/expenses.svg',
            display: budgetService.format(expenses),
            percentage: budgetService.percentage(income, expenses)
        }
    };

    const addSchema = {
        description: {
            value: '',
            placeholder: 'Описание',
            className: 'input add__description'
        },
        category: {
            value: '',
            placeholder: 'Категория',
            className: 'input add__category'
        },
        amount: {
            value: '',
            type: 'number',
            placeholder: 'Сумма',
            className: 'input add__amount'
        }
    };

    useEffect(() => {
        const interval = setInterval( () => {
            // console.clear();
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    });

    const openModalHandler = () => {
        setModalWindowOpen(true);
        service.delay(0).then(() =>  setActive(true));
    };

    const createValue = (idx, name, control) => {
        return (
            <div className={'budget__total--all'} key={idx + name}>
                <div className={'budget__total--box'}>
                    <img className={'budget__total--image'} src={control.icon} alt={control.name}/>
                </div>

                <div className={'budget__total--sum'}>
                    {control.display}
                </div>
                <div className={'budget__total--heading'}>{control.name}</div>
                {control.percentage ? <div className={'budget__total--percentage'}>{control.percentage}</div> : null}
            </div>
        );
    };

    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__header--title'}>Доступный бюджет на
                        <span className={'budget__header--month'}> {app.title(date)}</span>
                    </div>

                    <div className={'budget__header--subtitle'}>
                        {app.time(date)} | {app.date(date).substr(0, 20)} | валюта - Рубль (Rub)
                    </div>
                </div>


                <Tabs
                    setTabs={setTabs}
                    tabItems={tabItems}
                    onClick={() => openModalHandler(active, modalWindowOpen)}
                />

                {
                    loading ? <BounceLoader/> :
                        <div className={'budget__box'}>
                            {
                                tabs === 0 && <div className={'budget__total'}>
                                    <div className={'budget__total--one'}/>
                                    <div className={'budget__total--two'}/>
                                    {app.valueRender(totalSchema, createValue)}
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

            <AddPopup
                active={active}
                service={service}
                setActive={setActive}
                modalWindowOpen={modalWindowOpen}
                setModalWindowOpen={setModalWindowOpen}
            >
                <AddData schema={addSchema}/>
            </AddPopup>

            <ErrorPopup
                error={error}
                budget={budgetError}
                modalWindowOpen={modalWindowOpen}
                setModalWindowOpen={setModalWindowOpen}
            >
                <div className={'error-popup__error'}>
                    <span>Не авторизован для доступа</span>
                </div>
            </ErrorPopup>
        </>
    );
};


export default Budget;