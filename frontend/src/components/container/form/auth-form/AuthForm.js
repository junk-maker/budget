import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import SignalPopup from '../../popup/SignalPopup';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import AppService from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import MarkupService from '../../../../services/markupService';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../../../services/validationService';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authActions';
import {fetchResetPassword} from '../../../../redux/actions/resetPasswordActions';
import {fetchRecoverPassword} from '../../../../redux/actions/recoverPasswordActions';


const AuthForm = props => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const {type, schema, language, children, resetToken} = props;
    const validationService = new ValidationService();
    const [count, setCount] = useState(30);
    const markupService = new MarkupService();
    const [form, setForm] = useState(schema);
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
    const response = error || email || resetPassword ? error || resetPassword || email.response : null;

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
        await dispatch(
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
        let isFormValidLocal = validationService.setStateHandler(schema);
        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const input = (idx, name, result, control) =>
        <Input
            result={result}
            type={control.type}
            value={control.value}
            autoComplete={control.autocomplete}
            strength={control.validation.strength}
            className={!error ? (!control.touched  ? 'input' :
                validationService.isInvalid(control.valid, control.touched, !!control.validation) || (control.validation.confirm &&
                    form.password.value !==  form.confirmPassword.value) ||
                (control.validation.strength && result.score < 2)
                    ? 'input error' : 'input success') : 'input error'
            }
            onChange={e => validationService.changeHandler(e, name, form, setStateHandler)}
        />
    ;

    const expression = !error ?
        (!loading ? !isFormValid ? 'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off')
        : 'auth__btn-off'
    ;

    const createAuthInput = (idx, name, control) => markupService.inputPattern(idx, form, name, input, control);

    const markdown = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                        <span>
                            {appService.authToggle(type, {
                                reset: null,
                                verify: null,
                                recover: null,
                                up: appService.checkLanguage(language) ? 'Воспользоваться' : 'Use',
                                in: appService.checkLanguage(language) ? 'Нет аккаунта? ' : 'Do not have an account?'
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
                                        up: appService.checkLanguage(language) ? 'аккаунтом' : 'account',
                                        in: appService.checkLanguage(language) ? 'Зарегистрироваться' : 'Register now'
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
                                            up: appService.checkLanguage(language) ? 'Регистрация' : 'Registration',
                                            in: appService.checkLanguage(language) ? 'Авторизация' : 'Authorization',
                                            reset: appService.checkLanguage(language) ? 'Установить пароль' : 'Set password',
                                            verify: appService.checkLanguage(language) ? 'Подтвердить почту' : 'Confirm mail',
                                            recover: appService.checkLanguage(language) ? 'Забыли пароль?' : 'Forgot your password',
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
                                                in: appService.checkLanguage(language) ?'Войти' : 'Sign in',
                                                up: appService.checkLanguage(language) ? 'Создать' : 'Sign up',
                                                reset: appService.checkLanguage(language) ? 'Установить' : 'Set',
                                                recover: appService.checkLanguage(language) ? 'Сбросить' : 'Reset',
                                                verify: count !== 0 ? count :
                                                    appService.checkLanguage(language) ? 'Отправить повторно' : 'Resend',
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
                                                recover: appService.checkLanguage(language) ? 'На главную' : 'To main',
                                                in: appService.checkLanguage(language) ? 'Нужна помощь?' : 'Need help?',
                                                up: appService.checkLanguage(language) ? 'Нужна помощь?' : 'Need help?',
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
                language={language}
                resetPassword={resetPassword}
                setIsFormValid={setIsFormValid}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>
                        {error || email || resetPassword ? appService.authResponseToggle(response, language) : null}
                    </span>
                </div>
            </SignalPopup>
        </>
    );
};


AuthForm.propTypes = {
    type: PropTypes.string,
    schema: PropTypes.object,
    language: PropTypes.string,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};


export default AuthForm;