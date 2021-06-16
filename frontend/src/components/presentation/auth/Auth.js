import React from 'react';
import PropTypes from 'prop-types';
import AppService from '../../../services/appService';
import AuthForm from '../../container/form/auth-form/AuthForm';


const Auth = props => {
    const appService = new AppService();
    const {type, schema, children} = props;

    return(
        <div className={'auth'}>
            <div className={'auth__header'}>
                <div className={appService.authToggle(type, {
                    in: 'auth__header--auth',
                    up: 'auth__header--register',
                    verify: 'auth__header--auth',
                    recover: 'auth__header--auth',
                })}>
                    <div className={'auth__title'}>
                        <div className={'auth__title--wrapper'}>
                            <div className={'auth__title--cell'}>
                                <h1 className={'auth__title--heading'}>Бюджет</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AuthForm type={type} schema={schema} children={children}/>
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
};


export default Auth;