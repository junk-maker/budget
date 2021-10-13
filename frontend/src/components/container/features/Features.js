import Context from '../../../context/Context';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useIsOpened from '../../../hooks/open-alert-hook';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import {fetchFeatures, featuresResetStateHandler} from '../../../redux/actions/featuresActions';


const Features = () => {
    // console.log('Features')
    const {appService, markupService, storageService} = useContext(Context);
    const featuresActions = useSelector(state => state.getFeatures);
    const {error} = featuresActions;
    const dispatch = useDispatch();

    const isOpened = useIsOpened(error);

    useEffect(() => {
        dispatch(fetchFeatures());
    }, [dispatch]);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(featuresResetStateHandler());
        storageService.removeItem('authToken');
    };

    const createFeatures = (name, control) =>
        <li className={'features__card'} key={control.id}>
            <h2 className={'features__card--heading'}>{control.heading}</h2>
            <p className={'features__card--text'}>{control.text}</p>
        </li>
    ;

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponseSwitch(error) : null}
    </AlertPopup>;

    return(
        <>
            <section className={'features'}>
                <div className={'features__header'}>
                    <h1 className={'features__heading'}>
                        {markupService.toggleFeatureLanguage('main')}
                    </h1>

                    <p className={'features__text'}>
                        {markupService.toggleFeatureLanguage('sub')}
                    </p>
                </div>

                <div className={'features__main'}>
                    <ul className={'features__container'}>
                        {appService.objectIteration(markupService.featuresPattern(), createFeatures)}
                    </ul>
                </div>
            </section>
            {isOpened && alert}
        </>
    );
};


export default Features;