import * as Tab from './index';
import Value from '../form/value/Value';
import useOpen from '../../../hooks/open-hook';
import useDate from '../../../hooks/date-hook';
import Context from '../../../context/Context';
import Tabs from '../../presentation/tabs/Tabs';
import useMonth from '../../../hooks/month-hook';
import useBudget from '../../../hooks/budget-hook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import useIsOpened from '../../../hooks/open-alert-hook';
import Slider from '../../presentation/ui/slider/Slider';
import usePagination from '../../../hooks/pagination-hook';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import RemovePopup from '../../presentation/ui/popup/RemovePopup';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchBudget, deleteItem, budgetResetStateHandler} from '../../../redux/actions/budgetActions';


let pageSize = 3;
let startPage = 1;
const Budget = () => {
    const {date} = useDate();
    const dispatch = useDispatch();
    const {monthId, setMonthId} = useMonth();
    const {pageCount, setPageCount} = usePagination();
    const {open, setOpen, isOpen, setIsOpen} = useOpen();
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

    useEffect(() => dispatch(fetchBudget(monthId, currentCurrency)), [monthId, dispatch, currentCurrency]);
   
    const addItemHandler = () => {
        setValue(null);
        setToggle(true);
        setCurrency(null);
        setOpen(prev => !prev);
        setEdit(markupService.addTemplate(true));
        setHeading(markupService.budgetHeadingTemplate()['add']);
        return {
            TotalBudget() {setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage))},
            Income() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[0]], currencyStorage))},
            Expenses() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[1]], currencyStorage))} 
        }[tab]();
    };

    const editItemHandler = id => {
        setId(id);
        setToggle(false);
        setOpen(prev => !prev);
        let index = concatenatedDate.findIndex(val => val._id === id);
        setEdit(markupService.addTemplate(false, concatenatedDate[index].description,
            concatenatedDate[index].category, String(concatenatedDate[index].amount))
        );
        setValue(concatenatedDate[index].value);
        setPrevValue(concatenatedDate[index].value);
        setCurrency(concatenatedDate[index].currency);
        setPrevCurrency(concatenatedDate[index].currency);
        setHeading(markupService.budgetHeadingTemplate()['change']);
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
                setId={setId} 
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
                openRemoveHandler={() => setIsOpen(prev => !prev)}
            />;
        }
    };

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponse()[error] : null}
    </AlertPopup>;

    const form = <ValuePopup onClose={() => setOpen(prev => !prev)}>
        <Value
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
    </ValuePopup>;

    const remove = <RemovePopup 
        markupService={markupService}
        onClose={() => setIsOpen(prev => !prev)} 
        onClick={() => dispatch(deleteItem(id, monthId, currentCurrency))}
    />;

    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__title'}>
                        {markupService.budgetHeadingTemplate()['title']}
                        <span> {appService.currentMonth(date)}</span>
                    </div>

                    <div className={'budget__subtitle'}>
                        {appService.time(date)} | {appService.date(date)}
                        {markupService.budgetHeadingTemplate()['subtitle']} {currentCurrency.cut} ({currentCurrency.currency})
                    </div>
                </div>

                <div className={'budget__container'}>
                    <Tabs
                        setTab={setTab}
                        appService={appService}
                        onClick={addItemHandler}
                        budgetStorage={budgetStorage}

                    />
                    
                    <div className={'budget__currency'}>
                        <Slider
                            type={'currency'}
                            appService={appService}
                            slides={currencyStorage}
                            setCurrentCurrency={setCurrentCurrency}
                        />
                    </div>
                </div>

                <div className={'budget__box'}>
                    {loading ? <BounceLoader className={'bounce--budget'}/> : renderSelectedTab()}
                </div>
            </div>
            
            {open && form}
            {isOpen && remove}
            {useIsOpened(error) && alert}
        </>
    );
};


export default Budget;