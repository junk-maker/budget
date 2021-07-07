import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import AppService from '../../../services/appService';
import Button from '../../presentation/ui/button/Button';
import {authReset} from '../../../redux/actions/authActions';
import {resetPasswordReset} from '../../../redux/actions/resetPasswordActions';
import {recoverPasswordReset} from '../../../redux/actions/recoverPasswordActions';


const SignalPopup = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const appService = new AppService();
    const {type, email, error, reset, schema, message, children, setForm,
        resetPassword, errorPopupOpen, setIsFormValid, setErrorPopupOpen} = props;

    const modalWindowCloseHandler = () => {
        let auth = () => {
            let authToggle = appService.authToggle(type, {
                in: authReset,
                up: authReset,
                verify: '',
                recover: recoverPasswordReset,
            });

            setForm(schema);
            setIsFormValid(false);
            dispatch(authToggle());
            appService.delay(500).then(() => setErrorPopupOpen(false));
        };

        let protectedRoute = budget => {
            dispatch(budget());
            appService.delay(500).then(() => {
                window.location.reload();
                setErrorPopupOpen(false);
                localStorage.removeItem('authToken');
            });
        };

        let messageClose = close => {
            dispatch(close());
            appService.delay(500).then(() => setErrorPopupOpen(false));
        };

        let resetClose = () => {
            dispatch(resetPasswordReset());
            appService.delay(500).then(() => {
                setErrorPopupOpen(false);
                history.push('/sign-in');
            });
        };

        let contactToggle = message ? messageClose : protectedRoute;

        appService.errorHandlerToggle(type, {
            in: auth,
            up: auth,
            recover: auth,
            reset: resetClose,
            budget: protectedRoute,
            contact: contactToggle,
            features: protectedRoute,
        }, reset);
    };

    const popup = <div className={error || email || message || resetPassword ? 'error-popup open': 'error-popup close'}>
        <div className={'error-popup__body'}>
            <div  className={'error-popup__container'}>
                <div className={'error-popup__heading'}>
                    <span>Оповещение</span>
                </div>
                {children}
                <div className={'error-popup__holder'}>
                    <Button
                        onClick={modalWindowCloseHandler}
                        className={'btn btn__logout'}
                    >
                        <span>Хорошо</span>
                    </Button>
                </div>
            </div>
        </div>
    </div>;

    return(
        <>
            {errorPopupOpen && popup}
        </>
    );
};

SignalPopup.propTypes = {
    reset: PropTypes.func,
    type: PropTypes.string,
    error: PropTypes.string,
    setForm: PropTypes.func,
    email: PropTypes.object,
    schema: PropTypes.object,
    message: PropTypes.object,
    children: PropTypes.object,
    setIsFormValid: PropTypes.func,
    errorPopupOpen: PropTypes.bool,
    resetPassword: PropTypes.string,
    setErrorPopupOpen: PropTypes.func,
};


export default SignalPopup;