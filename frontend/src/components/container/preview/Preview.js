import React from 'react';
import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Button from '../../presentation/ui/button/Button';
import MarkupService from '../../../services/markupService';
import AuthView from '../../presentation/auth-view/AuthView';


const Preview = props => {
    const {language} = props;

    const budgetActions  = useSelector(state => state.getAuth);
    const markupService = new MarkupService(language);
    const {token} = budgetActions;

    return (
        <AuthView>
            <div className={'preview'}>
                <header className={'preview__header'}>
                    <div className={'preview__logo'}>
                        <i className={'fa fa-chart-pie'}/>
                    </div>
                    <motion.div
                        initial={{y: -250}}
                        animate={{y: -10}}
                        className={'preview__title'}
                        transition={{delay: 0.8, type: 'spring', stiffness: 45}}
                    >
                        <h1>{markupService.languagePreviewToggle('title')}</h1>
                    </motion.div>
                </header>


                <div className={'preview__text'}>
                    <h2 className={'preview__heading'}>
                        <span className={'preview__heading--main'}>
                            {markupService.languagePreviewToggle('main')}
                        </span>
                        <span className={'preview__heading--sub'}>
                            {markupService.languagePreviewToggle('sub')}
                        </span>
                    </h2>


                    <Link to={!token ? '/sign-in' : '/features'}>
                        <Button className={'btn btn__preview'}>
                            <span>{!token ?
                                markupService.languageButtonToggle('auth') :
                                markupService.languageButtonToggle('go')}
                            </span>
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthView>
    );
};


Preview.propTypes = {
    language: PropTypes.string,
};


export default Preview;