import ErrorPopup from '../popup/ErrorPopup';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../../services/appService';
import {fetchFeatures} from '../../../redux/actions/budgetActions';
import DataSchemasService from '../../../services/dataSchemas Service';


const Features = () => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const budgetActions =  useSelector(state => state.getBudget);
    const featuresSchema = new DataSchemasService();
    const appService = new AppService();
    const dispatch = useDispatch();
    const {error} = budgetActions;

    useEffect(() => {
        dispatch(fetchFeatures(setErrorPopupOpen));
    }, [dispatch]);

    const createFeatures = (idx, name, control) => {
        return(
            <li className={'features__card'} key={idx + name}>
                <h2 className={'features__card--heading'}>{control.heading}</h2>
                <p className={'features__card--text'}>{control.text}</p>
            </li>
        );
    };

    return(
        <>
            <section className={'features'}>
                <div className={'features__header'}>
                    <h1 className={'features__heading'}>
                        Приложение для финансов
                    </h1>

                    <p className={'features__text'}>
                        Наши инструменты помогут контролировать ваши персональные финансы
                    </p>
                </div>

                <div className={'features__main'}>
                    <ul className={'features__container'}>
                        {appService.objectIteration(featuresSchema.featuresSchema(), createFeatures)}
                    </ul>
                </div>
            </section>

            <ErrorPopup
                error={error}
                type={'features'}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>Не авторизован для доступа</span>
                </div>
            </ErrorPopup>
        </>
    );
};


export default Features;