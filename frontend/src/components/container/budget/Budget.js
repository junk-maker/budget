import AddPopup from '../popup/AddPopup';
import ErrorPopup from '../popup/ErrorPopup';
import AddForm from '../form/add-form/AddForm';
import Tabs from '../../presentation/tabs/Tabs';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Income from '../../presentation/income/Income';
import AppService from '../../../services/appService';
import Expenses from '../../presentation/expenses/Expenses';
import BudgetService from '../../../services/budgetService';
import {fetchBudget} from '../../../redux/actions/budgetActions';
import valueStorage from '../../../json-storage/valueStorage.json';
import DataSchemasService from '../../../services/dataSchemasService';
import currencyStorage from '../../../json-storage/currencyStorage.json';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';


const Budget = () => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const budgetService = new BudgetService();
    const [id, setId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [coin, setCoin] = useState(null);
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState(null);
    const [toggle , setToggle] = useState(null);
    const [active, setActive] = useState(false);
    const [heading , setHeading] = useState('');
    const [dropdown, setDropdown] = useState(null);
    const budgetActions =  useSelector(state => state.getBudget);
    const [tabs, setTabs] = useState(schema.tabItems()[0].openTab);
    const [addPopupOpen, setAddPopupOpen] = useState(false);
    const [prevCoin, setPrevCoin] = useState(null);
    const {error, income, loading, currency, expenses} = budgetActions;
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchBudget(setErrorPopupOpen));
    }, [dispatch]);

    useEffect(() => {
        // const interval = setInterval( () => {
        //     // console.clear();
        //     setDate(new Date());
        // }, 1000);
        // return () => clearInterval(interval);
    });

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

    const openModalHandler = () => {
        setAddPopupOpen(true);
        appService.delay(0).then(() =>  setActive(true));
    };

    const autoClosingHandler = () => {
        setActive(false);
        appService.delay(300).then(() =>  setAddPopupOpen(false));
    };

    const addItemHandler = () => {
        setCoin(null);
        openModalHandler();
        setValue(null);
        setToggle(true);
        setHeading('Добавить');
        setEdit(schema.addSchema(true));
        setDropdown(schema.dropdownSchema(true, valueStorage, currencyStorage));
    };

    const editItemHandler = (id) => {
        setId(id);
        openModalHandler();
        setToggle(false);
        setHeading('Изменить');
        let concatenated = income.concat(expenses);
        let index = concatenated.findIndex(val => val._id === id);
        setEdit(schema.addSchema(false, concatenated[index].description,
            concatenated[index].category, String(concatenated[index].amount))
        );
        setCoin(concatenated[index].coin);
        setValue(concatenated[index].value);
        setPrevCoin(concatenated[index].coin);
        setDropdown(schema.dropdownSchema(false, valueStorage, currencyStorage));
    };

    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__header--title'}>Доступный бюджет на
                        <span className={'budget__header--month'}> {appService.title(date)}</span>
                    </div>

                    <div className={'budget__header--subtitle'}>
                        {appService.time(date)} | {appService.date(date).substr(0, 20)} | валюта - Рубль (Rub)
                    </div>
                </div>


                <Tabs
                    setTabs={setTabs}
                    onClick={addItemHandler}
                    tabItems={schema.tabItems()}
                />

                {
                    loading ? <BounceLoader/> :
                        <div className={'budget__box'}>
                            {
                                tabs === 0 && <div className={'budget__total'}>
                                    <div className={'budget__total--one'}/>
                                    <div className={'budget__total--two'}/>
                                    {
                                        appService.objectIteration(
                                            schema.budgetSchema(
                                                budgetService.budget(income, expenses, currency),
                                                budgetService.format(income, currency),
                                                budgetService.format(expenses, currency,),
                                                budgetService.percentage(income, expenses)
                                            ), createValue
                                        )
                                    }
                                </div>
                            }
                            <div className={'budget__value'}>
                                {
                                    tabs === 1 && <Income
                                        income={income}
                                        onClick={editItemHandler}
                                        setErrorPopupOpen={setErrorPopupOpen}
                                    />
                                }
                                {
                                    tabs === 2 && <Expenses
                                        income={income}
                                        expenses={expenses}
                                        onClick={editItemHandler}
                                        setErrorPopupOpen={setErrorPopupOpen}
                                    />
                                }
                            </div>
                        </div>
                }
            </div>

            <AddPopup
                active={active}
                service={appService}
                setActive={setActive}
                addPopupOpen={addPopupOpen}
                setAddPopupOpen={setAddPopupOpen}
            >
                <AddForm
                    id={id}
                    edit={edit}
                    coin={coin}
                    value={value}
                    toggle={toggle}
                    setEdit={setEdit}
                    heading={heading}
                    setCoin={setCoin}
                    setValue={setValue}
                    dropdown={dropdown}
                    currency={currency}
                    prevCoin={prevCoin}
                    autoClosing={autoClosingHandler}
                    setErrorPopupOpen={setErrorPopupOpen}/>
            </AddPopup>

            <ErrorPopup
                error={error}
                type={'budget'}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>Не авторизован для доступа</span>
                </div>
            </ErrorPopup>
        </>
    );
};


export default Budget;