import * as Charts from './index';
import {formatLocale} from 'd3-format';
import {transition} from 'd3-transition';
import Context from '../../../context/Context';
import useMonth from '../../../hooks/month-hook';
import useBudget from '../../../hooks/budget-hook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import useIsOpened from '../../../hooks/open-alert-hook';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import VisualizationService from '../../../services/visualizationService';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {fetchStatistics, statisticsResetStateHandler} from '../../../redux/actions/statisticsActions';


const Statistics = () => {
    const dispatch = useDispatch();
    const {value, setValue} = useBudget();
    const {monthId, setMonthId} = useMonth();
    const statisticsActions = useSelector(state => state.getStatistics);
    const {language, appService, monthStorage, markupService, budgetService,
        currencyStorage, statisticStorage, dataSchemasService} = useContext(Context)
    ;
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);

    const {error, income, loading, expenses} = statisticsActions;

    useEffect(() => dispatch(fetchStatistics(currentCurrency)), [dispatch, currentCurrency]);

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
                {loading ? <BounceLoader className={'bounce--statistics'}/> : markupService.statisticsHeadingTemplate()['statistics']}
            </div>;
        } else {
            let Chart = Charts[value.type];
            let visualizationService = new VisualizationService(value.type, income, monthId, language, expenses, currentCurrency);
            let data = markupService.dataVisualizationTemplate(visualizationService)[value.type];
            return <Chart
                data={data}
                monthId={monthId}
                setMonthId={setMonthId}
                tickFormat={tickFormat}
                appService={appService}
                monthStorage={monthStorage}
                markupService={markupService}
                getTransition={getTransition}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
                currencyStorage={currencyStorage}
                setCurrentCurrency={setCurrentCurrency}
            />;
        };
    };

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

                <div className={'statistics__container'}>
                    {renderSelectedChart()}
                </div>
            </div>
            
            {useIsOpened(error) && alert}
        </>
    );
};


export default Statistics;