import {format} from 'd3-format';
import PropTypes from 'prop-types';
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


const Statistic = props => {
    const {language} = props;
    const dispatch = useDispatch();
    const appService = new AppService();
    const budgetService = new BudgetService();
    const schemaService = new DataSchemasService();
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
                language={language}
                setValue={setValue}
                options={control.options}
                placeholder={appService.checkLanguage(language) ? 'Выбрать статистику' : 'Select statistics'}
            />
        </div>
    ;

    const renderSelectedGraphic = () => {
        if(!value) {
            return loading ? <BounceLoader/> : <div className={'statistic__alarm'}>
                {appService.checkLanguage(language) ? 'Статистика не выбрана' : 'No statistics selected'}
            </div>;
        } else {
            let Graphic = Graphics[value.type];
            let visualizationService = new VisualizationService(value.type, income, language, expenses, currentCurrency);
            let data = appService.dataVisualizationToggle(value.type, language, visualizationService);
            return <Graphic
                data={data}
                language={language}
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
                        {appService.checkLanguage(language) ? 'Статистика' : 'Statistics'}
                    </div>
                </div>

                <div className={'statistic__dropdown'}>
                    {appService.objectIteration(schemaService.dropdownSchema(false, statisticStorage), createDropdown)}
                </div>

                <div className={'statistic__container-svg'}>
                    {renderSelectedGraphic()}
                </div>
            </div>


            <SignalPopup
                error={error}
                type={'statistic'}
                language={language}
                reset={statisticReset}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{error ? appService.budgetResponseToggle(error, language) : null}</span>
                </div>
            </SignalPopup>
        </>
    );
};


Statistic.propTypes = {
    language: PropTypes.string,
};


export default Statistic;