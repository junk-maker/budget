import * as Tab from './index';
import useOpen from '../../../hooks/open-hook';
import useDate from '../../../hooks/date-hook';
import Context from '../../../context/Context';
import AddForm from '../form/add-form/AddForm';
import Tabs from '../../presentation/tabs/Tabs';
import useMonth from '../../../hooks/month-hook';
import useBudget from '../../../hooks/budget-hook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import useIsOpened from '../../../hooks/open-alert-hook';
import Slider from '../../presentation/ui/slider/Slider';
import usePagination from '../../../hooks/pagination-hook';
import FormPopup from '../../presentation/ui/popup/FormPopup';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchBudget, budgetResetStateHandler} from '../../../redux/actions/budgetActions';


let pageSize = 3;
let startPage = 1;
const Budget = () => {
    const {date} = useDate();
    const dispatch = useDispatch();
    const {open, setOpen} = useOpen();
    const {monthId, setMonthId} = useMonth();
    const {pageCount, setPageCount} = usePagination();
    const {currentPage, setCurrentPage} = usePagination();
    const budgetActions =  useSelector(state => state.getBudget);
    const {appService, monthStorage, markupService, valueStorage, 
        budgetStorage, currencyStorage, dataSchemasService} = useContext(Context);
    const {currency, setCurrency, prevCurrency, setPrevCurrency,
        currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);
    const {id, tab, edit, setId, value, setTab, toggle, setEdit, heading,
        dropdown, setValue, prevValue, setToggle, setHeading, setDropdown, setPrevValue} = useBudget();

    const {error, income, loading, expenses} = budgetActions;

    const concatenatedDate = income.concat(expenses);

    useEffect(() => {
        dispatch(fetchBudget(monthId));
    }, [monthId, dispatch]);

    const openBudgetPopupHandler = () => setOpen(prev => !prev);

    const addItemHandler = () => {
        setValue(null);
        setToggle(true);
        setCurrency(null);
        openBudgetPopupHandler();
        setEdit(markupService.addPattern(true));
        setHeading(appService.checkLanguage() ? 'Добавить' : 'Add');
        appService.tabSwitch(tab, {
            total() {setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage))},
            income() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[0]], currencyStorage))},
            expenses() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[1]], currencyStorage))}
        });
    };

    const editItemHandler = id => {
        setId(id);
        setToggle(false);
        openBudgetPopupHandler();
        let index = concatenatedDate.findIndex(val => val._id === id);
        setEdit(markupService.addPattern(false, concatenatedDate[index].description,
            concatenatedDate[index].category, String(concatenatedDate[index].amount))
        );
        setValue(concatenatedDate[index].value);
        setPrevValue(concatenatedDate[index].value);
        setCurrency(concatenatedDate[index].currency);
        setPrevCurrency(concatenatedDate[index].currency);
        setHeading(appService.checkLanguage() ? 'Изменить' : 'Change');
        setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage));
    };

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(budgetResetStateHandler());
    };
   
    const renderSelectedTab = () => {
        let Budget;
        if(tab === 'TotalBudget') {
            Budget = Tab[tab];
            return <Budget
                income={income}
                expenses={expenses}
                currentCurrency={currentCurrency}
            />;
        } else {
            Budget = Tab[tab];
            return <Budget
                income={income}
                monthId={monthId}
                expenses={expenses}
                pageSize={pageSize} 
                startPage={startPage}
                pageCount={pageCount} 
                currentPage={currentPage} 
                onClick={editItemHandler}
                setPageCount={setPageCount}
                setCurrentPage={setCurrentPage}   
                currentCurrency={currentCurrency}
            />;
        }
    };

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponseSwitch(error) : null}
    </AlertPopup>;

    const form = <FormPopup onClose={openBudgetPopupHandler}>
        <AddForm
            id={id}
            edit={edit}
            value={value}
            toggle={toggle}
            setEdit={setEdit}
            monthId={monthId}
            heading={heading}
            setValue={setValue}
            currency={currency}
            dropdown={dropdown}
            prevValue={prevValue}
            setCurrency={setCurrency}
            prevCurrency={prevCurrency}
            setPrevValue={setPrevValue}
            setPrevCurrency={setPrevCurrency}
        />
    </FormPopup>

    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__header--title'}>
                        {markupService.toggleBudgetLanguage('main')}
                        <span className={'budget__header--month'}> {appService.title(date)}</span>
                    </div>

                    <div className={'budget__header--subtitle'}>
                        {appService.time(date)} | {appService.date(date)}
                        {markupService.toggleBudgetLanguage('sub')} {currentCurrency.cut} ({currentCurrency.currency})
                    </div>
                </div>

                <div className={'budget__select'}>
                    <Slider
                        name={'month'}
                        monthId={monthId}
                        slides={monthStorage}
                        appService={appService}
                        setMonthId={setMonthId}
                    />
                </div>

                <Tabs
                    setTab={setTab}
                    appService={appService}
                    onClick={addItemHandler}
                    budgetStorage={budgetStorage}
                />

                <div className={'budget__select'}>
                   <Slider
                       name={'currency'}
                       appService={appService}
                       slides={currencyStorage}
                       setCurrentCurrency={setCurrentCurrency}
                   />
                </div>

                {
                    loading ? <BounceLoader/> :
                        <div className={'budget__box'}>
                            {renderSelectedTab()}
                        </div>
                }
            </div>
            
            {open && form}
            {useIsOpened(error) && alert}
        </>
    );
};


export default Budget;