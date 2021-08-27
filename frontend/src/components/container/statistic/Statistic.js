import {format} from 'd3-format';
import * as Graphics from './index';
import {transition} from 'd3-transition';
import SignalPopup from '../popup/SignalPopup';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../../services/appService';
import BudgetService from '../../../services/budgetService';
import Dropdown from '../../presentation/ui/dropdown/Dropdown';
import DataSchemasService from '../../../services/dataSchemasService';
import {statisticReset} from '../../../redux/actions/statisticActions';
import {fetchStatistic} from '../../../redux/actions/statisticActions';
import currencyStorage from '../../../json-storage/currencyStorage.json';
import VisualizationService from '../../../services/visualizationService';
import statisticStorage from '../../../json-storage/statisticStorage.json';
import BounceLoader from '../../presentation/ui/bounce-loader/BounceLoader';


const Statistic = () => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const budgetService = new BudgetService();
    const [value, setValue] = useState(null);
    const budgetActions = useSelector(state => state.getStatistic);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(currencyStorage[0]);

    const {error, income, loading, expenses} = budgetActions;


    useEffect(() => {
        dispatch(fetchStatistic(setErrorPopupOpen));
    }, [dispatch]);

    const setFormat = format('.2s');
    const tickFormat = value => setFormat(value).replace('G', 'B');
    const getTransition = (duration) => transition().duration(duration);


    const createDropdown = (idx, name, control) =>
        <div className={'wrapper'} key={idx + name}>
            <Dropdown
                name={name}
                value={value}
                toggle={true}
                setValue={setValue}
                options={control.options}
                placeholder={'Выбрать статистику'}
            />
        </div>
    ;

    const renderSelectedGraphic = () => {
        if(!value) {
            return loading ? <BounceLoader/> : <div className={'statistic__alarm'}>Статистика не выбрана</div>;
        } else {
            let Graphic = Graphics[value.type];
            let visualizationService = new VisualizationService(value.type, income, expenses, currentCurrency);
            let data = appService.dataVisualizationToggle(value.type, visualizationService);
            return <Graphic
                data={data}
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
                    <div className={'statistic__header--title'}>Статистика</div>
                </div>

                <div className={'statistic__dropdown'}>
                    {appService.objectIteration(schema.dropdownSchema(false, statisticStorage), createDropdown)}
                </div>

                <div className={'statistic__container-svg'}>
                    {renderSelectedGraphic()}
                </div>
            </div>


            <SignalPopup
                error={error}
                type={'statistic'}
                reset={statisticReset}
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