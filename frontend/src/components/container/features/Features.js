import Context from '../../../context/Context';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useIsOpened from '../../../hooks/open-alert-hook';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import {fetchFeatures, featuresResetStateHandler} from '../../../redux/actions/featuresActions';


const Features = () => {
    //console.log('work')
    const {appService, markupService} = useContext(Context);
    const featuresActions = useSelector(state => state.getFeatures);
    const {error} = featuresActions;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeatures());
    }, [dispatch]);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(featuresResetStateHandler());
    };

    const featuresRender = markupService.featuresTemplate().map(val => (
        <li className={'features__card'} key={val.id}>
            <h2 className={'features__card--heading'}>{val.heading}</h2>
            <p className={'features__card--text'}>{val.text}</p>
        </li>
    ));

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponseSwitch(error) : null}
    </AlertPopup>;

    return (
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
                        {featuresRender}
                    </ul>
                </div>
            </section>

            {useIsOpened(error) && alert}
        </>
    );
};


export default Features;