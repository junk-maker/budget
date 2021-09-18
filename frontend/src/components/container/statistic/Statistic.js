import {format} from 'd3-format';
import * as Graphics from './index';
import {transition} from 'd3-transition';
import Context from '../../../context/Context';
import SignalPopup from '../popup/SignalPopup';
import useValue from '../../../hooks/valueHook';
import useError from '../../../hooks/errorHook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCurrency from '../../../hooks/currencyHook';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import {statisticReset} from '../../../redux/actions/statisticActions';
import {fetchStatistic} from '../../../redux/actions/statisticActions';
import VisualizationService from '../../../services/visualizationService';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';


const Statistic = () => {
    const dispatch = useDispatch();
    const {value, setValue} = useValue();
    const {errorPopupOpen, setErrorPopupOpen} = useError();
    const budgetActions = useSelector(state => state.getStatistic);
    const {language, appService, budgetService, currencyStorage,
        statisticStorage, dataSchemasService} = useContext(Context);
    const {currentCurrency, setCurrentCurrency} = useCurrency(currencyStorage);

    const {error, income, loading, expenses} = budgetActions;


    useEffect(() => {
        dispatch(fetchStatistic(setErrorPopupOpen));
    }, [dispatch, setErrorPopupOpen]);

    const setFormat = format('.2s');
    const tickFormat = value => setFormat(value).replace('G', 'B');
    const getTransition = (duration) => transition().duration(duration);


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

    const renderSelectedGraphic = () => {
        if(!value) {
            return loading ? <BounceLoader/> : <div className={'statistic__alarm'}>
                {appService.checkLanguage() ? 'Статистика не выбрана' : 'No statistics selected'}
            </div>;
        } else {
            let Graphic = Graphics[value.type];
            let visualizationService = new VisualizationService(value.type, income, language, expenses, currentCurrency);
            let data = appService.dataVisualizationToggle(value.type, visualizationService);
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
                    {appService.objectIteration(dataSchemasService.dropdownSchema(false, statisticStorage), createDropdown)}
                </div>

                <div className={'statistic__container-svg'}>
                    {renderSelectedGraphic()}
                </div>
            </div>


            <SignalPopup
                error={error}
                type={'statistic'}
                reset={statisticReset}
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


export default Statistic;