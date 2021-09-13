import * as Tab from './index';
import PropTypes from 'prop-types';
import AddPopup from '../popup/AddPopup';
import SignalPopup from '../popup/SignalPopup';
import AddForm from '../form/add-form/AddForm';
import Tabs from '../../presentation/tabs/Tabs';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../../services/appService';
import Slider from '../../presentation/ui/slider/Slider';
import MarkupService from '../../../services/markupService';
import BudgetService from '../../../services/budgetService';
import valueStorage from '../../../json-storage/valueStorage.json';
import budgetStorage from '../../../json-storage/budgetStorage.json';
import DataSchemasService from '../../../services/dataSchemasService';
import currencyStorage from '../../../json-storage/currencyStorage.json';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchBudget, budgetReset} from '../../../redux/actions/budgetActions';


const Budget = props => {
    const {language} = props;
    const dispatch = useDispatch();
    const appService = new AppService();
    const budgetService = new BudgetService();
    const [id, setId] = useState(null);
    const [date, setDate] = useState(new Date());
    const [tab, setTab] = useState(null);
    const schemaService = new DataSchemasService();
    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState(null);
    const markupService = new MarkupService(language);
    const [active, setActive] = useState(false);
    const [heading , setHeading] = useState('');
    const [toggle, setToggle] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const [currency, setCurrency] = useState(null);
    const budgetActions =  useSelector(state => state.getBudget);
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
        setEdit(markupService.addPattern(true));
        setHeading(appService.checkLanguage(language) ? 'Добавить' : 'Add');
        setDropdown(schemaService.dropdownSchema(true, valueStorage, currencyStorage));
    };

    const editItemHandler = (id) => {
        setId(id);
        openModalHandler();
        setToggle(false);
        let concatenated = income.concat(expenses);
        let index = concatenated.findIndex(val => val._id === id);
        setValue(concatenated[index].value);
        setEdit(markupService.addPattern(false, concatenated[index].description,
            concatenated[index].category, String(concatenated[index].amount))
        );
        setValue(concatenated[index].value);
        setCurrency(concatenated[index].currency);
        setPrevCurrency(concatenated[index].currency);
        setHeading(appService.checkLanguage(language) ? 'Изменить' : 'Change');
        setDropdown(schemaService.dropdownSchema(false, valueStorage, currencyStorage));
    };

    const renderSelectedTab = () => {
        let Budget;
        if(!tab) {
            Budget = Tab['TotalBudget'];
            return <Budget
                income={income}
                language={language}
                expenses={expenses}
                markup={markupService}
                appService={appService}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
            />;
        } else {
            Budget = Tab[tab];
            return <Budget
                income={income}
                language={language}
                expenses={expenses}
                markup={markupService}
                appService={appService}
                onClick={editItemHandler}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
                setErrorPopupOpen={setErrorPopupOpen}
            />;
        }
    };

    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__header--title'}>
                        {markupService.languageBudgetToggle('main')}
                        <span className={'budget__header--month'}> {appService.title(date, language)}</span>
                    </div>

                    <div className={'budget__header--subtitle'}>
                        {appService.time(date)} | {appService.date(date).substr(0, 23)}
                        {markupService.languageBudgetToggle('sub')} {currentCurrency.cut} ({currentCurrency.currency})
                    </div>
                </div>

                <Tabs
                    setTab={setTab}
                    language={language}
                    onClick={addItemHandler}
                    budgetStorage={budgetStorage}
                />

                <div className={'budget__select'}>
                   <Slider language={language} slides={currencyStorage} setCurrentCurrency={setCurrentCurrency}/>
                </div>

                {
                    loading ? <BounceLoader/> :
                        <div className={'budget__box'}>
                            {renderSelectedTab()}
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
                    setValue={setValue}
                    currency={currency}
                    language={language}
                    dropdown={dropdown}
                    setCurrency={setCurrency}
                    setDropdown={setDropdown}
                    prevCurrency={prevCurrency}
                    autoClosing={autoClosingHandler}
                    setErrorPopupOpen={setErrorPopupOpen}/>
            </AddPopup>

            <SignalPopup
                error={error}
                type={'budget'}
                reset={budgetReset}
                language={language}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{error ? appService.budgetResponseToggle(error, language) : null}</span>
                </div>
            </SignalPopup>
        </>
    );
};


Budget.propTypes = {
    language: PropTypes.string,
};


export default Budget;