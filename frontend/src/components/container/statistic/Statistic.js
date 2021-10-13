import * as Graphics from './index';
import {formatLocale} from 'd3-format';
import {transition} from 'd3-transition';
import Context from '../../../context/Context';
import useBudget from '../../../hooks/budget-hook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currency-hook';
import useIsOpened from '../../../hooks/open-alert-hook';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import {fetchStatistic} from '../../../redux/actions/statisticActions';
import VisualizationService from '../../../services/visualizationService';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';
import {statisticResetStateHandler} from '../../../redux/actions/statisticActions';


const Statistic = () => {
    // console.log('Statistic')
    const dispatch = useDispatch();
    const {value, setValue} = useBudget();
    const budgetActions = useSelector(state => state.getStatistic);
    const {language, appService, budgetService, storageService, currencyStorage,
        statisticStorage, dataSchemasService} = useContext(Context);
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);

    const {error, income, loading, expenses} = budgetActions;
    const isOpened = useIsOpened(error);

    useEffect(() => {
        dispatch(fetchStatistic());
    }, [dispatch]);

    const locale = formatLocale(currentCurrency.locale);
    const setFormat = locale.format("$,");
    const tickFormat = value => setFormat(value).replace('G', 'B');
    const getTransition = (duration) => transition().duration(duration);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(statisticResetStateHandler());
        storageService.removeItem('authToken');
    };

    const createDropdown = (name, control) =>
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
    ;

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
            let visualizationService = new VisualizationService(value.type, income, language, expenses, currentCurrency);
            let data = appService.dataVisualizationSwitch(value.type, visualizationService);
            return <Graphic
                data={data}
                appService={appService}
                tickFormat={tickFormat}
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
                        dataSchemasService.dropdownSchema(false, statisticStorage), createDropdown)
                    }
                </div>

                <div className={'statistic__container-svg'}>
                    {renderSelectedGraphic()}
                </div>
            </div>
            {isOpened && alert}
        </>
    );
};


export default Statistic;