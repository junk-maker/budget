import React from 'react';
import PropTypes from 'prop-types';
import AppService from '../../../services/appService';
import MarkupService from '../../../services/markupService';
import AuthForm from '../../container/form/auth-form/AuthForm';


const Auth = props => {
    const {type, schema, language, children, resetToken} = props;
    const markupService = new MarkupService(language);
    const appService = new AppService();

    return(
        <div className={'auth'}>
            <div className={'auth__header'}>
                <div className={appService.authToggle(type, {
                    in: 'auth__header--auth',
                    up: 'auth__header--register',
                    reset: 'auth__header--auth',
                    verify: 'auth__header--auth',
                    recover: 'auth__header--auth'
                })}>
                    <div className={'auth__title'}>
                        <div className={'auth__title--wrapper'}>
                            <div className={'auth__title--cell'}>
                                <h1 className={'auth__title--heading'}>
                                    {markupService.languagePreviewToggle('title')}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AuthForm type={type} schema={schema} language={language} children={children} resetToken={resetToken}/>
            <div className={'auth__footer'}>
                <div/>
            </div>
        </div>
    );
};


Auth.propTypes = {
    type: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    language: PropTypes.string,
    resetToken: PropTypes.string,
};


export default Auth;