import React from 'react';
import PropTypes from 'prop-types';
import {AppService} from '../../../services/appService';
import AuthForm from '../../container/form/auth-form/AuthForm';


const Auth = props => {
    const appService = AppService;
    const {auth, type, schema, service, children} = props;

    return(
        <div className={'auth'}>
            <div className={'auth__header'}>
                <div className={appService.switchClassName(type)}
                >
                    <div className={'auth__title'}>
                        <div className={'auth__title--wrapper'}>
                            <div className={'auth__title--cell'}>
                                <h1 className={'auth__title--heading'}>Бюджет</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AuthForm auth={auth} type={type} schema={schema} service={service} children={children}/>
            <div className={'auth__footer'}>
                <div/>
            </div>
        </div>
    );
};


Auth.propTypes = {
    auth: PropTypes.bool,
    service: PropTypes.bool,
    schema: PropTypes.object,
};


export default Auth;