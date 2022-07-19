import * as Charts from './index';
import {formatLocale} from 'd3-format';
import {transition} from 'd3-transition';
import useOpen from '../../../hooks/open-hook';
import Context from '../../../context/Context';
import useBudget from '../../../hooks/budget-hook';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import Slider from '../../presentation/ui/slider/Slider';
import useIsOpened from '../../../hooks/open-alert-hook';
import useDatepicker from '../../../hooks/datepicker-hook';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';
import Datepicker from '../../presentation/ui/datepicker/Datepicker';
import React, {useMemo, useEffect, useContext, useCallback} from 'react';
import VisualizationService from '../../../services/visualizationService';
import {fetchStatistics, statisticsResetStateHandler} from '../../../redux/actions/statisticsActions';


const Statistics = () => {
    const dispatch = useDispatch();
    const {popupOpen, setPopupOpen, 
        datepickerPopupOpen, setDatepickerPopupOpen} = useOpen()
    ;
    const statisticsActions = useSelector(state => state.getStatistics);
    const {value, setEnd, setStart, setYear, setMonth, setValue} = useBudget();
    const {language, appService, markupService, budgetService,
        currencyStorage, statisticStorage, dataSchemasService} = useContext(Context)
    ;
    const {endDate, startDate,  monthesNames, selectedMonth} = useDatepicker(appService);
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);
    const {error, income, loading, expenses} = statisticsActions;
    
    const setEndCallback = useCallback(() => setEnd(null), [setEnd]);
    const setSatrtCallback = useCallback(() => setStart(null), [setStart]);
    const setYearCallback = useCallback(() => setYear(selectedMonth.year), [setYear, selectedMonth.year]);
    const setMonthCallback = useCallback(() => setMonth(selectedMonth.monthIndex), [setMonth, selectedMonth.monthIndex]);

    const visualizationService = useMemo(() => new VisualizationService(value?.type, income, language, expenses, monthesNames, currentCurrency), [value?.type, income, language, expenses, monthesNames, currentCurrency]);
    const data = useMemo(() => markupService.dataVisualizationTemplate(visualizationService)[value?.type], [value?.type, markupService, visualizationService]);

    useEffect(() => {
        dispatch(fetchStatistics(endDate, startDate, selectedMonth.year, value?.type, selectedMonth.monthIndex, currentCurrency));
    }, [value, endDate, startDate, dispatch, selectedMonth, currentCurrency]);

    const getTransition = useMemo(() => duration => transition().duration(duration), []);
    const locale = useMemo(() => formatLocale(currentCurrency.locale), [currentCurrency?.locale]);
    
    const setFormat = useMemo(() => locale.format("$,"), [locale]);
    const tickFormat = useCallback(value => setFormat(value).replace('G', 'B'), [setFormat]);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(statisticsResetStateHandler());
    };
    
    const createDropdown = (name, control) => (
        <div className={'wrapper'} key={control.id + name}>
            <Dropdown
                name={name}
                value={value}
                toggle={true}
                setValue={setValue}
                appService={appService}
                options={control.options}
                markupService={markupService}
                placeholder={markupService.statisticsHeadingTemplate()['dropdown']}
            />
        </div>
    );

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponse()[error] : null}
    </AlertPopup>;

    const renderSelectedChart = () => {
        if(!value) {
            return <div className={'statistics__value'}>
                {markupService.statisticsHeadingTemplate()['statistics']}
            </div>;
        } else {
            let Chart = Charts[value.type];
            
            return <Chart
                data={data}                    
                loading={loading}
                tickFormat={tickFormat}
                markupService={markupService}
                getTransition={getTransition}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
            />;
        };
    };

    const datepickerPopup = <ValuePopup popupOpen={popupOpen} onClose={() => setDatepickerPopupOpen(prev => !prev)}>
        <Datepicker
            type={value?.type}
            dispatch={dispatch}
            appService={appService}
            setPopupOpen={setPopupOpen}
            markupService={markupService}
            fetchStatistics={fetchStatistics}
            currentCurrency={currentCurrency}
        />
    </ValuePopup>;
    
    return (
        <>
            <div className={'statistics'}>
                <div className={'statistics__header'}>
                    <div className={'statistics__header-title'}>
                        {markupService.statisticsHeadingTemplate()['title']}
                    </div>
                </div>

                <div className={'statistics__dropdown'}>
                    {appService.objectIteration(dataSchemasService.dropdownSchema(false, statisticStorage), createDropdown)}
                </div>

                <div 
                    className={loading || value?.type === undefined ? 'statistics__datepicker--hide' : `statistics__datepicker statistics__datepicker${markupService.statisticsHeadingTemplate()[value.type]}`}
                >
                    <img 
                        className={'statistics__datepicker-img'} 
                        onClick={() => {
                            setPopupOpen('');
                            setDatepickerPopupOpen(prev => !prev);
                        }}
                        alt={markupService.svgHeadingTemplate()['datepicker']}
                        src={markupService.statisticsHeadingTemplate()['datepicker']} 
                    />
                </div>
                <div 
                    className={loading || value?.type === undefined ? 'statistics__currency--hide' : `statistics__currency statistics__currency${markupService.statisticsHeadingTemplate()[value.type]}`}
                >
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

                <div className={'statistics__container'}>
                    {renderSelectedChart()}
                </div>
            </div>
            
            {useIsOpened(error) && alert}
            {datepickerPopupOpen && datepickerPopup}
        </>
    );
};


export default Statistics;