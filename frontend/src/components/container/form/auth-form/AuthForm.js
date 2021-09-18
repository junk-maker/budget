import PropTypes from 'prop-types';
import useAuth from '../../../../hooks/authHook';
import Context from '../../../../context/Context';
import SignalPopup from '../../popup/SignalPopup';
import {Link, useHistory} from 'react-router-dom';
import useError from '../../../../hooks/errorHook';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validationHook';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authActions';
import {fetchResetPassword} from '../../../../redux/actions/resetPasswordActions';
import {fetchRecoverPassword} from '../../../../redux/actions/recoverPasswordActions';


const AuthForm = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {type, schema, children, resetToken} = props;
    const {isFormValid, setIsFormValid} = useValidation();
    const {errorPopupOpen, setErrorPopupOpen} = useError();
    const {form, count, timer, setForm} = useAuth(30, schema);
    const {appService, markupService, validationService} = useContext(Context);

    // console.log('auth form')


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
        return () => {
            if (localStorage.getItem('authToken')) {
                history.push('/features');
            }
        }
    }, [history]);

    useEffect(() => {
        // console.clear();
        // if (count === 0) return;
        // let interval = setInterval(timer, 1000);
        // return () => clearInterval(interval);
    }, [count, timer]);

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

    const input = (name, result, control) =>
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

    const createAuthInput = (name, control) => markupService.inputPattern(form, name, input, control);

    const markdown = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                        <span>
                            {appService.authToggle(type, {
                                reset: null,
                                verify: null,
                                recover: null,
                                up: appService.checkLanguage() ? 'Воспользоваться' : 'Use',
                                in: appService.checkLanguage() ? 'Нет аккаунта? ' : 'Do not have an account?'
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
                                        up: appService.checkLanguage() ? 'аккаунтом' : 'account',
                                        in: appService.checkLanguage() ? 'Зарегистрироваться' : 'Register now'
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
                                            up: appService.checkLanguage() ? 'Регистрация' : 'Registration',
                                            in: appService.checkLanguage() ? 'Авторизация' : 'Authorization',
                                            reset: appService.checkLanguage() ? 'Установить пароль' : 'Set password',
                                            verify: appService.checkLanguage() ? 'Подтвердить почту' : 'Confirm mail',
                                            recover: appService.checkLanguage() ? 'Забыли пароль?' : 'Forgot your password',
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
                                                in: appService.checkLanguage() ? 'Войти' : 'Sign in',
                                                up: appService.checkLanguage() ? 'Создать' : 'Sign up',
                                                reset: appService.checkLanguage() ? 'Установить' : 'Set',
                                                recover: appService.checkLanguage() ? 'Сбросить' : 'Reset',
                                                verify: count !== 0 ? count :
                                                    appService.checkLanguage() ? 'Отправить повторно' : 'Resend',
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
                                                recover: appService.checkLanguage() ? 'На главную' : 'To main',
                                                in: appService.checkLanguage() ? 'Нужна помощь?' : 'Need help?',
                                                up: appService.checkLanguage() ? 'Нужна помощь?' : 'Need help?',
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
                appService={appService}
                resetPassword={resetPassword}
                setIsFormValid={setIsFormValid}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>
                        {error || email || resetPassword ? appService.authResponseToggle(response) : null}
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