import * as Charts from './index';
import {formatLocale} from 'd3-format';
import {transition} from 'd3-transition';
import useOpen from '../../../hooks/open-hook';
import Context from '../../../context/Context';
import useBudget from '../../../hooks/budget-hook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import Slider from '../../presentation/ui/slider/Slider';
import useIsOpened from '../../../hooks/open-alert-hook';
import useDatepicker from '../../../hooks/datepicker-hook';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';
import Datepicker from '../../presentation/ui/datepicker/Datepicker';
import VisualizationService from '../../../services/visualizationService';
import {fetchStatistics, statisticsResetStateHandler} from '../../../redux/actions/statisticsActions';


const Statistics = () => {
    const dispatch = useDispatch();
    const {datepickerPopupOpen, setDatepickerPopupOpen} = useOpen();
    const statisticsActions = useSelector(state => state.getStatistics);
    const {value, setEnd, setStart, setYear, setMonth, setValue} = useBudget();
    const {language, appService, markupService, budgetService,
        currencyStorage, statisticStorage, dataSchemasService} = useContext(Context)
    ;
    const {endDate, startDate,  monthesNames, selectedMonth} = useDatepicker(appService);
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);
    const {error, income, loading, expenses} = statisticsActions;

    useEffect(() => {
        dispatch(fetchStatistics(endDate, startDate, selectedMonth.year, value?.type, selectedMonth.monthIndex, currentCurrency));
    }, [value, endDate, startDate, dispatch, selectedMonth, currentCurrency]);

    const locale = formatLocale(currentCurrency.locale);
    const setFormat = locale.format("$,");
    const tickFormat = value => setFormat(value).replace('G', 'B');
    const getTransition = duration => transition().duration(duration);

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
            let visualizationService = new VisualizationService(value.type, income, language, expenses, monthesNames, currentCurrency);
            let data = markupService.dataVisualizationTemplate(visualizationService)[value.type];
            
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

    const datepickerPopup = <ValuePopup onClose={() => setDatepickerPopupOpen(prev => !prev)}>
        <Datepicker
            setEnd={setEnd}
            setYear={setYear}
            type={value?.type}
            setStart={setStart}
            setMonth={setMonth}
            dispatch={dispatch}
            appService={appService}
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
                        onClick={() => setDatepickerPopupOpen(prev => !prev)}
                        alt={markupService.svgHeadingTemplate()['datepicker']}
                        src={markupService.statisticsHeadingTemplate()['datepicker']} 
                    />
                </div>
                <div 
                    className={loading || value?.type === undefined ? 'statistics__currency--hide' : `statistics__currency statistics__currency${markupService.statisticsHeadingTemplate()[value.type]}`}
                >
                    <Slider
                        type={'currency'}
                        appService={appService}
                        slides={currencyStorage}
                        setEnd={() => setEnd(null)}
                        markupService={markupService}
                        setStart={() => setStart(null)}
                        setCurrentCurrency={setCurrentCurrency}
                        setYear={() => setYear(selectedMonth.year)}
                        setMonth={() => setMonth(selectedMonth.monthIndex)}
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