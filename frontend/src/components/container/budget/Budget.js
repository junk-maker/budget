import AddPopup from '../popup/AddPopup';
import SignalPopup from '../popup/SignalPopup';
import AddForm from '../form/add-form/AddForm';
import Tabs from '../../presentation/tabs/Tabs';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Income from '../../presentation/income/Income';
import AppService from '../../../services/appService';
import Slider from '../../presentation/ui/slider/Slider';
import Expenses from '../../presentation/expenses/Expenses';
import BudgetService from '../../../services/budgetService';
import valueStorage from '../../../json-storage/valueStorage.json';
import DataSchemasService from '../../../services/dataSchemasService';
import currencyStorage from '../../../json-storage/currencyStorage.json';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchBudget, budgetReset} from '../../../redux/actions/budgetActions';




const Budget = () => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const budgetService = new BudgetService();
    const [id, setId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState(null);
    const [active, setActive] = useState(false);
    const [heading , setHeading] = useState('');
    const [toggle, setToggle] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const [currency, setCurrency] = useState(null);
    const budgetActions =  useSelector(state => state.getBudget);
    const [tabs, setTabs] = useState(schema.tabItems()[0].openTab);
    const [prevCurrency, setPrevCurrency] = useState(null);
    const [addPopupOpen, setAddPopupOpen] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(currencyStorage[0]);
    const {error, income, loading, expenses} = budgetActions;


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

    const createValue = (idx, name, control) =>
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
    ;

    const openModalHandler = () => {
        setAddPopupOpen(true);
        appService.delay(0).then(() =>  setActive(true));
    };

    const autoClosingHandler = () => {
        setActive(false);
        appService.delay(300).then(() =>  setAddPopupOpen(false));
    };

    const addItemHandler = () => {
        openModalHandler();
        setValue(null);
        setToggle(true);
        setCurrency(null);
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
        setValue(concatenated[index].value);
        setEdit(schema.addSchema(false, concatenated[index].description,
            concatenated[index].category, String(concatenated[index].amount))
        );
        setValue(concatenated[index].value);
        setCurrency(concatenated[index].currency);
        setPrevCurrency(concatenated[index].currency);
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
                        {appService.time(date)} | {appService.date(date).substr(0, 23)} | валюта - Рубль (Rub)
                    </div>
                </div>

                <Tabs
                    setTabs={setTabs}
                    onClick={addItemHandler}
                    tabItems={schema.tabItems()}
                />

                <div className={'budget__select'}>
                   <Slider slides={currencyStorage} setCurrentCurrency={setCurrentCurrency}/>
                </div>

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
                                                budgetService.budget(income, expenses, currentCurrency),
                                                budgetService.format(income, currentCurrency),
                                                budgetService.format(expenses, currentCurrency),
                                                budgetService.percentage(income, expenses, currentCurrency)
                                            ), createValue
                                        )
                                    }
                                </div>
                            }
                            {
                                tabs === 1 && <Income
                                    income={income}
                                    onClick={editItemHandler}
                                    currentCurrency={currentCurrency}
                                    setErrorPopupOpen={setErrorPopupOpen}
                                />
                            }
                            {
                                tabs === 2 && <Expenses
                                    income={income}
                                    expenses={expenses}
                                    onClick={editItemHandler}
                                    currentCurrency={currentCurrency}
                                    setErrorPopupOpen={setErrorPopupOpen}
                                />
                            }
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
                    date={date}
                    edit={edit}
                    value={value}
                    toggle={toggle}
                    setEdit={setEdit}
                    heading={heading}
                    setCurrency={setCurrency}
                    setValue={setValue}
                    setDropdown={setDropdown}
                    currency={currency}
                    dropdown={dropdown}
                    prevCurrency={prevCurrency}
                    autoClosing={autoClosingHandler}
                    setErrorPopupOpen={setErrorPopupOpen}/>
            </AddPopup>

            <SignalPopup
                error={error}
                type={'budget'}
                reset={budgetReset}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{error ? appService.budgetResponseToggle(error) : null}</span>
                </div>
            </SignalPopup>
        </>
    );
};


export default Budget;