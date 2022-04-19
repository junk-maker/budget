import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';
import AuthForm from '../../container/form/auth-form/AuthForm';


const Auth = props => {
    const {type, token, schema, children, resetToken} = props;
    const {appService, markupService} = useContext(Context);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <div className={'auth'}>
                    <div className={'auth__header'}>
                        <div className={appService.authSwitch(type, {
                            in: 'auth__header--auth',
                            up: 'auth__header--register',
                            reset: 'auth__header--auth',
                            verify: 'auth__header--auth',
                            recovery: 'auth__header--auth',
                            activation: 'auth__header--auth',
                        })}>
                            <div className={'auth__title'}>
                                <div className={'auth__title--wrapper'}>
                                    <div className={'auth__title--cell'}>
                                        <h1 className={'auth__title--heading'}>
                                            {markupService.togglePreviewLanguage('title')}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AuthForm type={type} token={token} schema={schema} children={children} resetToken={resetToken}/>
                    
                    <div className={'auth__footer'}>
                        <div/>
                    </div>
                </div>
            </div>
        </div>
    );
};


Auth.propTypes = {
    type: PropTypes.string,
    token: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string
};


export default Auth;