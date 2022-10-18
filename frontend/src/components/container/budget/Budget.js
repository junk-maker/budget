import * as Tab from './index';
import Value from '../form/value/Value';
import useOpen from '../../../hooks/open-hook';
import useDate from '../../../hooks/date-hook';
import Context from '../../../context/Context';
import Tabs from '../../presentation/tabs/Tabs';
import useBudget from '../../../hooks/budget-hook';
import {useDispatch, useSelector} from 'react-redux';
import useAlert from '../../../hooks/open-alert-hook';
import useCurrency from '../../../hooks/currency-hook';
import Slider from '../../presentation/ui/slider/Slider';
import usePagination from '../../../hooks/pagination-hook';
import useDatepicker from '../../../hooks/datepicker-hook';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import RemovePopup from '../../presentation/ui/popup/RemovePopup';
import Datepicker from '../../presentation/ui/datepicker/Datepicker';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import React, {memo, useMemo, useEffect, useContext, useCallback} from 'react';
import {actionToBudget, actionToDeleteItem, budgetResetStateHandler} from '../../../redux/slice/budgetSlice';

const pageSize = 3;
const startPage = 1;
const Budget = memo(() => {
    const {date} = useDate();
    const budgetType = 'budget';
    const dispatch = useDispatch();
    const budgetDeleteType = 'delete-budget';
    const {pageCount, setPageCount} = usePagination();
    const {currentPage, setCurrentPage} = usePagination();
    const budgetActions =  useSelector(state => state.budget);
    const {appService, markupService, valueStorage, budgetStorage, 
        currencyStorage, dataSchemasService} = useContext(Context)
    ;
    const {currency, setCurrency, prevCurrency, setPrevCurrency,
        currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage)
    ;
    const {popupOpen, valuePopupOpen, removePopupOpen, setValuePopupOpen, 
        setPopupOpen, setRemovePopupOpen, datepickerPopupOpen, setDatepickerPopupOpen} = useOpen()
    ;
    const {
        id, end, tab, edit, year, start, month, setId, value, setTab,  
        setEnd, toggle, setEdit, heading, setYear, setStart, setMonth, 
        dropdown, setValue, prevValue, setToggle, setHeading, setDropdown, setPrevValue} = useBudget()
    ;
    
    const {endDate, startDate,  monthesNames, selectedMonth} = useDatepicker(appService);
    const {error, income, loading, expenses} = budgetActions;
    
    const setEndCallback = useCallback(() => setEnd(null), [setEnd]);
    const setSatrtCallback = useCallback(() => setStart(null), [setStart]);
    const concatenatedDate = useMemo(() => income.concat(expenses), [income, expenses]);
    const openRemoveHandler = useCallback(() => setRemovePopupOpen(prev => !prev), [setRemovePopupOpen]);
    const setYearCallback = useCallback(() => setYear(selectedMonth?.year), [setYear, selectedMonth?.year]);
    const index = useCallback(id => concatenatedDate.findIndex(val => val._id === id), [concatenatedDate]);
    const setMonthCallback = useCallback(() => setMonth(selectedMonth?.monthIndex), [setMonth, selectedMonth?.monthIndex]);

    const budgetData = useMemo(() => {return {
        end: endDate,
        start: startDate,
        type: budgetType,
        year: selectedMonth?.year,
        currency: currentCurrency,
        month: selectedMonth?.monthIndex,
    }}, [endDate, startDate,  budgetType, currentCurrency, selectedMonth?.year, selectedMonth?.monthIndex]);

    const deleteBudgetData = useMemo(() => {return {
        id,
        end,
        start,
        type: budgetDeleteType,
        currency: currentCurrency,
        year: !year ? selectedMonth?.year : year,
        month: !month ? selectedMonth?.monthIndex : month,
    }}, [id, end, year, start, month, budgetDeleteType, currentCurrency, selectedMonth?.year, selectedMonth?.monthIndex]);
    
    useEffect(() => {
        dispatch(actionToBudget(budgetData));
    }, [dispatch, budgetData]);
   
    const addItemHandler = useCallback(() => {
        setValue(null);
        setToggle(true);
        setCurrency(null);
        setValuePopupOpen(prev => !prev);
        setMonth(selectedMonth?.monthIndex);
        setEdit(markupService.addTemplate(true));
        setHeading(markupService.budgetHeadingTemplate()['add']);
        return {
            TotalBudget() {setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage))},
            Income() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[0]], currencyStorage))},
            Expenses() {setDropdown(dataSchemasService.dropdownSchema(true, [valueStorage[1]], currencyStorage))} 
        }[tab]();
    }, [tab, setEdit, setMonth, setValue, setToggle, setDropdown, setHeading, setCurrency, valueStorage, markupService, currencyStorage, setValuePopupOpen, dataSchemasService, selectedMonth?.monthIndex]);

    const editItemHandler = useCallback(id => {
        setId(id);
        setToggle(false);
        setYear(selectedMonth.year);
        setValuePopupOpen(prev => !prev);
        setMonth(selectedMonth?.monthIndex);
        setEdit(markupService.addTemplate(false, concatenatedDate[index(id)].description,
            concatenatedDate[index(id)].category, String(concatenatedDate[index(id)].amount))
        );
        setValue(concatenatedDate[index(id)].value);
        setPrevValue(concatenatedDate[index(id)].value);
        setCurrency(concatenatedDate[index(id)].currency);
        setPrevCurrency(concatenatedDate[index(id)].currency);
        setHeading(markupService.budgetHeadingTemplate()['change']);
        setDropdown(dataSchemasService.dropdownSchema(true, valueStorage, currencyStorage));
    }, [setId, index, setYear, setEdit, setValue, setMonth, setToggle, setHeading, setCurrency, setDropdown, valueStorage,  markupService, setPrevValue, currencyStorage, setPrevCurrency, concatenatedDate, setValuePopupOpen, dataSchemasService, selectedMonth?.year, selectedMonth?.monthIndex]);

    const deleteItemHandler = useCallback(() => {
        dispatch(actionToDeleteItem(deleteBudgetData));
    }, [dispatch, deleteBudgetData]);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(budgetResetStateHandler());
    };
   
    const renderSelectedTab = () => {
        let Budget;
        if (tab === 'TotalBudget') {
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
                expenses={expenses}
                pageSize={pageSize} 
                startPage={startPage}
                pageCount={pageCount}
                currentPage={currentPage} 
                onClick={editItemHandler}
                setPageCount={setPageCount}
                setPopupOpen={setPopupOpen}
                setCurrentPage={setCurrentPage}   
                currentCurrency={currentCurrency}
                openRemoveHandler={openRemoveHandler}
            />;
        }
    };

    const alertPopup = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponse()[error] : null}
    </AlertPopup>;

    const valuePopup = <ValuePopup popupOpen={popupOpen} onClose={() => setValuePopupOpen(prev => !prev)}>
        <Value
            id={id}
            end={end}
            edit={edit}
            year={year}
            start={start}
            month={month}
            value={value}
            toggle={toggle}
            setEdit={setEdit}
            heading={heading}
            currency={currency}
            setValue={setValue}
            dropdown={dropdown}
            prevValue={prevValue}
            setCurrency={setCurrency}
            setPopupOpen={setPopupOpen}
            prevCurrency={prevCurrency}
            setPrevValue={setPrevValue}
            setPrevCurrency={setPrevCurrency}
        />
    </ValuePopup>;

    const removePopup = <RemovePopup 
        onClick={deleteItemHandler}
        markupService={markupService}
        onClose={() => setRemovePopupOpen(prev => !prev)} 
    />;

    const datepickerPopup = <ValuePopup popupOpen={popupOpen} onClose={() => setDatepickerPopupOpen(prev => !prev)}>
        <Datepicker
            setEnd={setEnd}
            setYear={setYear}
            setMonth={setMonth}
            setStart={setStart}
            dispatch={dispatch}
            appService={appService}
            setPopupOpen={setPopupOpen}
            markupService={markupService}
            actionToBudget={actionToBudget}
            currentCurrency={currentCurrency}
        />
    </ValuePopup>;
    
    return (
        <>
            <div className={'budget'}>
                <div className={'budget__header'}>
                    <div className={'budget__title'}>
                        {appService.time(date)} | {appService.date(date)}
                    </div>

                    <div className={'budget__subtitle'}>
                        {markupService.budgetHeadingTemplate()['title']}
                        <span> 
                            {
                                (end === null || end === undefined) || (start === null || start === undefined) 
                                    ? <span>{monthesNames[month === null ? selectedMonth.monthIndex : month].month[0].toUpperCase() + monthesNames[month === null ? selectedMonth.monthIndex : month].month.slice(1)} {year === null ? selectedMonth.year : year}</span>
                                    : new Date(start).getMonth() === new Date(end).getMonth() 
                                    ? <span>
                                        {monthesNames[month === null ? selectedMonth.monthIndex : month].month[0].toUpperCase() + monthesNames[month === null ? selectedMonth.monthIndex : month].month.slice(1)} {year === null ? selectedMonth.year : year}
                                        </span>
                                    : <span>
                                        {monthesNames[new Date(start).getMonth()].month[0].toUpperCase() + monthesNames[new Date(start).getMonth()].month.slice(1)} {new Date(start).getFullYear()} <span>&ndash;</span> {monthesNames[new Date(end).getMonth()].month[0].toUpperCase() + monthesNames[new Date(end).getMonth()].month.slice(1)} {new Date(end).getFullYear()}
                                    </span>  
                            }
                        </span>
                        {markupService.budgetHeadingTemplate()['subtitle']} <span>&ndash;</span> {currentCurrency.cut} ({currentCurrency.currency})
                    </div>
                </div>

                <div className={'budget__container'}>
                    <Tabs
                        setTab={setTab}
                        appService={appService}
                        onClick={addItemHandler}
                        setPopupOpen={setPopupOpen}
                        budgetStorage={budgetStorage}

                    />
                    
                    <div className={'budget__currency'}>
                        <Slider
                            type={'currency'}
                            setEnd={setEndCallback}
                            appService={appService}
                            slides={currencyStorage}
                            setYear={setYearCallback}
                            setMonth={setMonthCallback}
                            setStart={setSatrtCallback}
                            markupService={markupService}
                            setCurrentCurrency={setCurrentCurrency}
                        />
                    </div>

                    <div className={'budget__datepicker'}>
                        <img 
                            className={'budget__datepicker-img'} 
                            onClick={() => {
                                setPopupOpen('');
                                setDatepickerPopupOpen(prev => !prev);
                            }}
                            alt={markupService.svgHeadingTemplate()['datepicker']}
                            src={markupService.budgetHeadingTemplate()['datepicker']} 
                        />
                    </div>
                </div>

                <div className={'budget__box'}>
                    {loading ? <BounceLoader className={'bounce--budget'}/> : renderSelectedTab()}
                </div>
            </div>
            
            {valuePopupOpen && valuePopup}
            {useAlert(error) && alertPopup}
            {removePopupOpen && removePopup}
            {datepickerPopupOpen && datepickerPopup}
        </>
    );
});

export default Budget;