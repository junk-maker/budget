import Context from '../../../context/Context';
import {useDispatch, useSelector} from 'react-redux';
import useIsOpened from '../../../hooks/open-alert-hook';
import React, {memo, useEffect, useContext} from 'react';
import AlertPopup from '../../presentation/ui/popup/AlertPopup';
import {fetchFeatures, featuresResetStateHandler} from '../../../redux/actions/featuresActions';

const Features = memo(() => {
    const featuresActions = useSelector(state => state.getFeatures);
    const {appService, markupService} = useContext(Context);
    const {error} = featuresActions;
    const dispatch = useDispatch();

    useEffect(() => dispatch(fetchFeatures()), [dispatch]);

    const alertResetStateHandler = () => {
        window.location.reload();
        dispatch(featuresResetStateHandler());
    };

    const featuresRender = markupService.featuresTemplate().map(val => (
        <li className={'features__card'} key={val.id}>
            <h2 className={'features__card-title'}>{val.title}</h2>
            <p className={'features__card-description'}>{val.description}</p>
        </li>
    ));

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error ? appService.budgetResponse()[error] : null}
    </AlertPopup>;

    return (
        <>
            <section className={'features'}>
                <div className={'features__header'}>
                    <h1 className={'features__title'}>
                        {markupService.featuresHeadingTemplate()['title']}
                    </h1>

                    <p className={'features__subtitle'}>
                        {markupService.featuresHeadingTemplate()['subtitle']}
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
});

export default Features;