import * as Tab from './index';
import AddPopup from '../popup/AddPopup';
import useId from '../../../hooks/idHook';
import useTab from '../../../hooks/tabHook';
import useOpen from '../../../hooks/openHook';
import useEdit from '../../../hooks/editHook';
import useDate from '../../../hooks/dateHook';
import Context from '../../../context/Context';
import SignalPopup from '../popup/SignalPopup';
import AddForm from '../form/add-form/AddForm';
import Tabs from '../../presentation/tabs/Tabs';
import useValue from '../../../hooks/valueHook';
import useError from '../../../hooks/errorHook';
import useToggle from '../../../hooks/toggleHook';
import useActive from '../../../hooks/activeHook';
import React, {useEffect, useContext} from 'react';
import useHeading from '../../../hooks/headingHook';
import {useDispatch, useSelector} from 'react-redux';
import useDropdown from '../../../hooks/dropdownHook';
import useCurrency from '../../../hooks/currencyHook';
import Slider from '../../presentation/ui/slider/Slider';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchBudget, budgetReset} from '../../../redux/actions/budgetActions';


const Budget = () => {
    const {id, setId} = useId();
    const {tab, setTab} = useTab();
    const dispatch = useDispatch();
    const {date, timer} = useDate();
    const {edit, setEdit} = useEdit();
    const {open, setOpen} = useOpen();
    const {value, setValue} = useValue();
    const {active, setActive} = useActive();
    const {toggle, setToggle} = useToggle();
    const {heading , setHeading} = useHeading();
    const {dropdown, setDropdown} = useDropdown();
    const {errorPopupOpen, setErrorPopupOpen} = useError();
    const budgetActions =  useSelector(state => state.getBudget);
    const {appService, markupService, budgetService, valueStorage,
        budgetStorage, currencyStorage, validationService, dataSchemasService} = useContext(Context);
    const {currency, setCurrency,
        prevCurrency, setPrevCurrency, currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);

    const {error, income, loading, expenses} = budgetActions;


    useEffect(() => {
        dispatch(fetchBudget(setErrorPopupOpen));
    }, [dispatch, setErrorPopupOpen]);

    useEffect(() => {
        let interval = setInterval(() => timer, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const openModalHandler = () => {
        setOpen(true);
        appService.delay(0).then(() =>  setActive(true));
    };

    const autoClosingHandler = () => {
        setActive(false);
        appService.delay(300).then(() =>  setOpen(false));
    };

    const addItemHandler = () => {
        openModalHandler();
        setValue(null);
        setToggle(true);
        setCurrency(null);
        setEdit(markupService.addPattern(true));
        setHeading(appService.checkLanguage() ? 'Добавить' : 'Add');
        setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage));
    };

    const editItemHandler = id => {
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
        setHeading(appService.checkLanguage() ? 'Изменить' : 'Change');
        setDropdown(dataSchemasService.dropdownSchema(false, valueStorage, currencyStorage));
    };

    const renderSelectedTab = () => {
        let Budget;
        if(!tab) {
            Budget = Tab['TotalBudget'];
            return <Budget
                income={income}
                expenses={expenses}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
            />;
        } else {
            Budget = Tab[tab];
            return <Budget
                income={income}
                expenses={expenses}
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
                        <span className={'budget__header--month'}> {appService.title(date)}</span>
                    </div>

                    <div className={'budget__header--subtitle'}>
                        {appService.time(date)} | {appService.date(date)}
                        {markupService.languageBudgetToggle('sub')} {currentCurrency.cut} ({currentCurrency.currency})
                    </div>
                </div>

                <Tabs
                    setTab={setTab}
                    appService={appService}
                    onClick={addItemHandler}
                    budgetStorage={budgetStorage}
                />

                <div className={'budget__select'}>
                   <Slider appService={appService} slides={currencyStorage} setCurrentCurrency={setCurrentCurrency}/>
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
                addPopupOpen={open}
                setActive={setActive}
                appService={appService}
                setAddPopupOpen={setOpen}
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
                    dropdown={dropdown}
                    appService={appService}
                    setCurrency={setCurrency}
                    setDropdown={setDropdown}
                    prevCurrency={prevCurrency}
                    markupService={markupService}
                    autoClosing={autoClosingHandler}
                    setErrorPopupOpen={setErrorPopupOpen}
                    validationService={validationService}
                />
            </AddPopup>

            <SignalPopup
                error={error}
                type={'budget'}
                reset={budgetReset}
                appService={appService}
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