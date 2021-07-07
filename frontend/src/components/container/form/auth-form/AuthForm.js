import PropTypes from 'prop-types';
import SignalPopup from '../../popup/SignalPopup';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import AppService from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../../../services/validationService';
import DataSchemasService from '../../../../services/dataSchemasService';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authActions';
import {fetchResetPassword} from '../../../../redux/actions/resetPasswordActions';
import {fetchRecoverPassword} from '../../../../redux/actions/recoverPasswordActions';


const AuthForm = props => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    // const [success, setSuccess] = useState(null);
    const {type, schema, children, resetToken} = props;
    const validationService = new ValidationService();
    const [count, setCount] = useState(30);
    const [form, setForm] = useState(schema);
    const pattern = new DataSchemasService();
    const appService = new AppService();
    const dispatch = useDispatch();
    const history = useHistory();

    const authActions  = useSelector(state => appService.authToggle(type, {
        verify: null,
        in: state.getAuth,
        up: state.getAuth,
        reset: state.getResetPassword,
        recover: state.getRecoverPassword,
    }));

    const {error, email, loading, resetPassword} = authActions;

    const submitHandler = e => e.preventDefault();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/features');
        }
    }, [history]);

    useEffect(() => {
        // console.clear();
        // if (count === 0) return;
        // let interval = setInterval( () => setCount(prev => prev - 1), 1000);
        // return () => clearInterval(interval);
    });

    const loginHandler = async () => {
        dispatch(
            fetchLogin(
                history,
                form.email.value,
                setErrorPopupOpen,
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
                setErrorPopupOpen,
                form.password.value
            )
        );
    };

    const recoverPasswordHandler = () => {
        dispatch(
            fetchRecoverPassword(
                form.email.value,
                setErrorPopupOpen
            )
        );
    };

    const resetPasswordHandler = () => {
        dispatch(
            fetchResetPassword(
                form.password.value,
                form.confirmPassword.value,
                resetToken,
                setErrorPopupOpen
            )
        );
    };

    const setStateHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            if (!schema.hasOwnProperty('confirmPassword')) {
                return isFormValidLocal = schema[name].valid && isFormValidLocal && schema[name].value !== '';
            } else {
                return isFormValidLocal = schema[name].valid && isFormValidLocal
                    && schema[name].value !== '' && schema['password'].value === schema['confirmPassword'].value;
            }

        });

        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const input = (idx, name, control) => {
        return(
            <Input
                type={control.type}
                value={control.value}
                autoComplete={control.autocomplete}
                className={!error ? (!control.touched ? 'input' :
                    validationService.isInvalid(control.valid, control.touched, !!control.validation)
                        ? 'input error' : 'input success') : 'input error'
                }
                onChange={e => validationService.changeHandler(e, name, form, setStateHandler)}
            />
        );
    };

    const validationError =(control) => {
        return  validationService.isInvalid(control.valid, control.touched, !!control.validation)
        || control.required ?
            <div className={'auth__form--input-error'}>
                <div className={'auth__form--input-title'}>
                    <span>{control.error || 'Введите верное значение'}</span>
                </div>
            </div>  : null
    }

    const expression = !error ?
        (!loading ? !isFormValid ? 'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off')
        : 'auth__btn-off';


    const createAuthInput = (idx, name, control) => {
        return pattern.authInputPattern(idx, name, input, control, validationError);
    };

    const markdown = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                        <span>
                            {appService.authToggle(type, {
                                reset: null,
                                verify: null,
                                recover: null,
                                in: 'Нет аккаунта',
                                up: 'Воспользоваться',
                            })}
                        </span>
            </div>
            &nbsp;
            <div className={'auth__form--register-link'}>
                <Link to={appService.authToggle(type, {
                    reset: '',
                    verify: '',
                    recover: '',
                    in: '/sign-up',
                    up: '/sign-in',
                })}>
                    <div className={'auth__form--register-heading'}>
                               <span>
                                    {appService.authToggle(type, {
                                        reset: null,
                                        verify: null,
                                        recover: null,
                                        up: 'аккаунтом',
                                        in: 'Зарегистрироваться',
                                    })}
                            </span>
                    </div>
                </Link>
            </div>
        </div>
    </div>;

    return(
        <>
            <div className={'auth__form'}>
                <div className={'auth__form--wrapper'}>
                    <div className={'auth__form--cell'}>
                        <div className={'auth__form--title'}>
                            <div className={'auth__form--heading'}>
                                    <span>
                                        {appService.authToggle(type, {
                                            in: 'Авторизация',
                                            up: 'Регистрация',
                                            reset: 'Сбросить пароль',
                                            recover: 'Забыли пароль?',
                                            verify: 'Подтвердить почту'
                                        })}
                                    </span>
                            </div>
                        </div>
                        <form onClick={e => submitHandler(e)}
                            className={'auth__form--entry'}>
                            {appService.renderToggle(type, form, children, createAuthInput)}
                            <div className={'auth__form--btn-cell'}>
                                <Button
                                    disabled={appService.authToggle(type, {
                                        verify: count !== 0,
                                        in: !error ? (!loading ? !isFormValid : true) : true,
                                        up: !error ? (!loading ? !isFormValid : true) : true,
                                        reset: !error ? (!loading ? !isFormValid : true) : true,
                                        recover: !error ? (!loading ? !isFormValid : true) : true,
                                    })}
                                    className={appService.authToggle(type, {
                                        in: expression,
                                        up: expression,
                                        reset: expression,
                                        recover: expression,
                                        verify: count !== 0 ? 'auth__btn-off' : 'auth__btn-on',
                                    })}
                                    onClick={appService.authToggle(type, {
                                        verify: null,
                                        in: loginHandler,
                                        up: registerHandler,
                                        reset: resetPasswordHandler,
                                        recover: recoverPasswordHandler,
                                    })}>
                                    <div className={'auth__form--btn-heading'}>
                                        <span>
                                            {!loading ? appService.authToggle(type, {
                                                in: 'Войти',
                                                up: 'Создать',
                                                reset: 'Сбросить',
                                                recover: 'Сбросить',
                                                verify: count !== 0 ? count : 'Отправить повторно',
                                            }) : <BtnLoader/>}
                                        </span>
                                    </div>
                                </Button>
                            </div>
                            <div className={'auth__form--help'}>
                                <Link to={appService.authToggle(type, {
                                    reset: '',
                                    verify: '',
                                    recover: '/',
                                    in: '/recover-password',
                                    up: '/recover-password',

                                })}>
                                    <div className={'auth__form--help-heading'}>
                                        <span>
                                            {appService.authToggle(type, {
                                                reset: '',
                                                verify: '',
                                                in: 'Нужна помощь?',
                                                up: 'Нужна помощь?',
                                                recover: 'На главную',
                                            })}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                {appService.authToggle(type, {
                    in: markdown,
                    up: markdown,
                    reset: null,
                    verify: null,
                    recover: null,
                })}
            </div>

            <SignalPopup
                type={type}
                email={email}
                error={error}
                schema={schema}
                setForm={setForm}
                resetPassword={resetPassword}
                setIsFormValid={setIsFormValid}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>
                        {appService.authToggle(type, {
                            verify: '',
                            up: 'Адрес электронной почты уже зарегистрирован',
                            reset: error ? 'Недействительный токен' : 'Пароль установлен',
                            in: <div>Неверные данные: <br/> электронная почта или пароль</div>,
                            recover: error ? 'Пользователь не найден' : 'Проверьте вашу почту',
                        })}
                    </span>
                </div>
            </SignalPopup>
        </>
    );
};


AuthForm.propTypes = {
    type: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};


export default AuthForm;