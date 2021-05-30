import PropTypes from 'prop-types';
import ErrorPopup from '../../popup/ErrorPopup';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import {AppService} from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import {ValidationService} from '../../../../services/validationService';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authAction';


const AuthForm = props => {
    const [modalWindowOpen, setModalWindowOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const budgetActions  = useSelector(state => state.getAuth);
    const [count, setCount] = useState(30);
    const validationService = ValidationService;
    const {type, schema, children} = props;
    const [form, setForm] = useState(schema);
    const {error, loading} = budgetActions;
    const dispatch = useDispatch();
    const appService = AppService;
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/features');
        }
    }, [history]);

    const submitHandler = event => {
        event.preventDefault();
    };

    const onChangeHandler = (e, name, form, callback) => {
        validationService.changeHandler(e, name, form, callback);
    };

    const loginHandler = async () => {
        dispatch(
            fetchLogin(
                history,
                form.email.value,
                setModalWindowOpen,
                form.password.value
            )
        );
    };

    const registerHandler = async () => {
        await dispatch(
            fetchRegister(
                history,
                form.name.value,
                form.email.value,
                setModalWindowOpen,
                form.password.value
            )
        );
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            if (!schema.hasOwnProperty('confirmPassword')) {
                return isFormValidLocal = schema[name].valid &&
                    isFormValidLocal && schema[name].value !== '';
            } else {
                return isFormValidLocal = schema[name].valid &&
                    isFormValidLocal && schema[name].value !== '' &&
                    schema['password'].value === schema['confirmPassword'].value;
            }
        });

        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };


    const createInput = (idx, name, control) => {
        let htmlFor = `${control.type}-${Math.random()}`;
        return (
            <div className={'auth__form--input'} key={idx + name}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span>{control.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            <Input
                                type={control.type}
                                value={control.value}
                                className={!error ? (!control.touched ? 'input' :
                                    validationService.isInvalid(control.valid, control.touched, !!control.validation)
                                        ? 'input error' : 'input success') : 'input error'
                                }
                                onChange={e => onChangeHandler(e, name, form, setStateHandler)}
                            />
                        </div>
                        {
                            validationService.isInvalid(control.valid, control.touched, !!control.validation)
                            || control.required ?
                                <div className={'auth__form--input-error'}>
                                    <div className={'auth__form--input-title'}>
                                        <span>{control.error || 'Введите верное значение'}</span>
                                    </div>
                                </div>  : null
                        }
                    </div>
                </div>
            </div>
        );
    };


    const expression = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                        <span>
                            {appService.switchTitleForAuth(type)}
                        </span>
            </div>
            &nbsp;
            <div className={'auth__form--register-link'}>
                <Link to={appService.switchLinksForAuth(type)}>
                    <div className={'auth__form--register-heading'}>
                               <span>
                                {appService.switchHeadingForAuth(type)}
                            </span>
                    </div>
                </Link>
            </div>
        </div>
    </div>;

    useEffect(() => {
        // console.clear();
        if (count === 0) return;
        let interval = setInterval( () => setCount(count - 1), 1000);
        return () => clearInterval(interval);
    });


    return(
        <>
            <div className={'auth__form'}>
                <div className={'auth__form--wrapper'}>
                    <div className={'auth__form--cell'}>
                        <div className={'auth__form--title'}>
                            <div className={'auth__form--heading'}>
                                    <span>
                                        {appService.switchHeading(type)}
                                    </span>
                            </div>
                        </div>
                        <form
                            onClick={submitHandler}
                            className={'auth__form--entry'}
                        >
                            {appService.switchValueRender(type, form, children, createInput)}
                            <div className={'auth__form--btn-cell'}>
                                <Button
                                    disabled={appService.switchButtonOptions(type, count !== 0,
                                        !error ? (!loading ? !isFormValid : true) : true)
                                    }
                                    className={
                                        appService.switchButtonOptions(type, count !== 0 ? 'auth__btn-off'
                                            : 'auth__btn-on', !error ? (!loading ? !isFormValid ?
                                            'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off') : 'auth__btn-off')
                                    }
                                    onClick={appService.switchAuthHandler(type, loginHandler, registerHandler)}
                                >
                                    <div className={'auth__form--btn-heading'}>
                                    <span>
                                        {!loading ? appService.switchButtonHeading(type, count) : <BtnLoader/>}
                                    </span>
                                    </div>
                                </Button>
                            </div>
                            <div className={'auth__form--help'}>
                                <Link to={appService.switchLinksForHelp(type)}>
                                    <div className={'auth__form--help-heading'}>
                                    <span>
                                       {appService.switchHelpHeading(type)}
                                    </span>
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                {appService.switchMarkdown(type, expression)}
            </div>

            <ErrorPopup
                type={type}
                error={error}
                schema={schema}
                setForm={setForm}
                setIsFormValid={setIsFormValid}
                modalWindowOpen={modalWindowOpen}
                setModalWindowOpen={setModalWindowOpen}
            >
                <div className={'error-popup__error'}>
                        <span>
                            {appService.switchErrorContent(type)}
                        </span>
                </div>
            </ErrorPopup>
        </>
    );
};


AuthForm.propTypes = {
    type: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object
};


export default AuthForm;