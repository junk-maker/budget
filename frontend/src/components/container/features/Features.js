import Context from '../../../context/Context';
import SignalPopup from '../popup/SignalPopup';
import useError from '../../../hooks/errorHook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchFeatures, featuresReset} from '../../../redux/actions/featuresActions';


const Features = () => {
    const featuresActions =  useSelector(state => state.getFeatures);
    const {appService, markupService} = useContext(Context);
    const {errorPopupOpen, setErrorPopupOpen} = useError();
    const {error} = featuresActions;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeatures(setErrorPopupOpen));
    }, [dispatch, setErrorPopupOpen]);

    const createFeatures = (name, control) =>
        <li className={'features__card'} key={control.id}>
            <h2 className={'features__card--heading'}>{control.heading}</h2>
            <p className={'features__card--text'}>{control.text}</p>
        </li>
    ;

    return(
        <>
            <section className={'features'}>
                <div className={'features__header'}>
                    <h1 className={'features__heading'}>
                        {markupService.languageFeatureToggle('main')}
                    </h1>

                    <p className={'features__text'}>
                        {markupService.languageFeatureToggle('sub')}
                    </p>
                </div>

                <div className={'features__main'}>
                    <ul className={'features__container'}>
                        {appService.objectIteration(markupService.featuresPattern(), createFeatures)}
                    </ul>
                </div>
            </section>

            <SignalPopup
                error={error}
                type={'features'}
                reset={featuresReset}
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


export default Features;