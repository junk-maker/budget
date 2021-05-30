import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {AppService} from '../../../services/appService';
import Button from '../../presentation/ui/button/Button';
import {authReset} from '../../../redux/actions/authAction';
import {budgetReset} from '../../../redux/actions/budgetActions';


const ErrorPopup = props => {
    const appService = AppService;
    const dispatch = useDispatch();
    const {type, error, schema, children, setForm, modalWindowOpen, setIsFormValid, setModalWindowOpen} = props;

    const modalWindowCloseHandler = () => {
        let auth = () => {
            setForm(schema);
            dispatch(authReset());
            setIsFormValid(false);
            appService.delay(500).then(() => setModalWindowOpen(false))
        };

        let budget = () => {
            dispatch( budgetReset());
            appService.delay(500).then(() => {
                window.location.reload();
                setModalWindowOpen(false);
                localStorage.removeItem('authToken');
            });
        };

        appService.switchErrorHandler(type, auth, budget);
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
            {modalWindowOpen && popup}
        </>
    );
};

ErrorPopup.propTypes = {
    type: PropTypes.string,
    error: PropTypes.string,
    setForm: PropTypes.func,
    schema: PropTypes.object,
    setIsFormValid: PropTypes.func,
    modalWindowOpen: PropTypes.bool,
    setModalWindowOpen: PropTypes.func,
};


export default ErrorPopup;