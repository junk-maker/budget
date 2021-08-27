import SignalPopup from '../popup/SignalPopup';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../../services/appService';
import MarkupService from '../../../services/markupService';
import {fetchFeatures, featuresReset} from '../../../redux/actions/featuresActions';


const Features = () => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const featuresActions =  useSelector(state => state.getFeatures);
    const appService = new AppService();
    const markup = new MarkupService();
    const {error} = featuresActions;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeatures(setErrorPopupOpen));
    }, [dispatch]);

    const createFeatures = (idx, name, control) =>
        <li className={'features__card'} key={idx + name}>
            <h2 className={'features__card--heading'}>{control.heading}</h2>
            <p className={'features__card--text'}>{control.text}</p>
        </li>
    ;

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
                        {appService.objectIteration(markup.featuresPattern(), createFeatures)}
                    </ul>
                </div>
            </section>

            <SignalPopup
                error={error}
                type={'features'}
                reset={featuresReset}
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


export default Features;