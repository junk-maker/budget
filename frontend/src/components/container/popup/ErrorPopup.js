import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import AppService from '../../../services/appService';
import Button from '../../presentation/ui/button/Button';
import {authReset} from '../../../redux/actions/authAction';
import {budgetReset} from '../../../redux/actions/budgetActions';


const ErrorPopup = props => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const {type, error, schema, children, setForm, errorPopupOpen, setIsFormValid, setErrorPopupOpen} = props;

    const modalWindowCloseHandler = () => {
        let auth = () => {
            setForm(schema);
            dispatch(authReset());
            setIsFormValid(false);
            appService.delay(500).then(() => setErrorPopupOpen(false))
        };

        let budget = () => {
            dispatch( budgetReset());
            appService.delay(500).then(() => {
                window.location.reload();
                setErrorPopupOpen(false);
                localStorage.removeItem('authToken');
            });
        };

        appService.errorHandlerToggle(type, {
            in: auth,
            up: auth,
            budget: budget,
            features: budget
        });
    };

    const popup = <div className={error ? 'error-popup open': 'error-popup close'}>
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

ErrorPopup.propTypes = {
    type: PropTypes.string,
    error: PropTypes.string,
    setForm: PropTypes.func,
    schema: PropTypes.object,
    children: PropTypes.object,
    setIsFormValid: PropTypes.func,
    errorPopupOpen: PropTypes.bool,
    setErrorPopupOpen: PropTypes.func,
};


export default ErrorPopup;