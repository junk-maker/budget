import * as Graphics from './index';
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
    const {language, appService, monthStorage, budgetService,
        currencyStorage, statisticStorage, dataSchemesService} = useContext(Context);
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);

    const {error, income, loading, expenses} = statisticsActions;

    useEffect(() => {
        dispatch(fetchStatistics());
    }, [dispatch]);

    const locale = formatLocale(currentCurrency.locale);
    const setFormat = locale.format("$,");
    const tickFormat = value => setFormat(value).replace('G', 'B');
    const getTransition = (duration) => transition().duration(duration);

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
                placeholder={appService.checkLanguage() ? 'Выбрать статистику' : 'Select statistics'}
            />
        </div>
    );

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponseSwitch(error) : null}
    </AlertPopup>;

    const renderSelectedGraphic = () => {
        if(!value) {
            return loading ? <BounceLoader/> : <div className={'statistic__alarm'}>
                {appService.checkLanguage() ? 'Статистика не выбрана' : 'No statistics selected'}
            </div>;
        } else {
            let Graphic = Graphics[value.type];
            let visualizationService = new VisualizationService(value.type, income, monthId, language, expenses, currentCurrency);
            let data = appService.dataVisualizationSwitch(value.type, visualizationService);
            return <Graphic
                data={data}
                monthId={monthId}
                setMonthId={setMonthId}
                appService={appService}
                tickFormat={tickFormat}
                monthStorage={monthStorage}
                getTransition={getTransition}
                budgetService={budgetService}
                currentCurrency={currentCurrency}
                currencyStorage={currencyStorage}
                setCurrentCurrency={setCurrentCurrency}
            />;
        }
    };

    return (
        <>
            <div className={'statistic'}>
                <div className={'statistic__header'}>
                    <div className={'statistic__header--title'}>
                        {appService.checkLanguage() ? 'Статистика' : 'Statistics'}
                    </div>
                </div>

                <div className={'statistic__dropdown'}>
                    {
                        appService.objectIteration(
                        dataSchemesService.dropdownScheme(false, statisticStorage), createDropdown)
                    }
                </div>

                <div className={'statistic__container-svg'}>
                    {renderSelectedGraphic()}
                </div>
            </div>
            
            {useIsOpened(error) && alert}
        </>
    );
};


export default Statistics;