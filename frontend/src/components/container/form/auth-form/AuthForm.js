import PropTypes from 'prop-types';
import useAuth from '../../../../hooks/auth-hook';
import Context from '../../../../context/Context';
import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useIsOpened from '../../../../hooks/open-alert-hook';
import {fetchPasswordRecovery, passwordRecoveryStateHandler}
    from '../../../../redux/actions/passwordRecoveryActions';
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import {activationResetStateHandler} from '../../../../redux/actions/emailActivationActions';
import {fetchLogin, fetchRegister, authResetStateHandler} from '../../../../redux/actions/authActions';
import {fetchPasswordReset, passwordResetStateHandler} from '../../../../redux/actions/passwordResetActions';
import {dataVerification, resetEmailVerificationStateHandler} from '../../../../redux/actions/verifyEmailActions';


const AuthForm = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {type, token, schema, children, resetToken} = props;
    const {form, count, setForm, setCount} = useAuth(30, schema);
    const {appService, markupService, storageService, validationService} = useContext(Context);
    //console.log('work');

    const authActions  = useSelector(state => appService.authSwitch(type, {
        in: state.getAuth,
        up: state.getAuth,
        verify: state.getVerify,
        reset: state.getPasswordReset,
        activation: state.getActivation,
        recovery: state.getPasswordRecovery,
    }));

    const {error, email, verify, loading, passwordReset} = authActions;

    const response = error || email || verify || passwordReset ?
        error || passwordReset || email?.response || verify?.response : null;

    useEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (storageService.getItem('authToken') && parts.length === 2) return navigate('/features');
    }, [navigate, storageService]);

    const loginHandler = () => {
        dispatch(
            fetchLogin(
                navigate,
                form.email.value,
                form.password.value
            )
        );
    };

    const registerHandler = () => {
        dispatch(
            fetchRegister(
                navigate,
                form.name.value,
                form.email.value,
                form.password.value
            )
        );
    };

    const recoverPasswordHandler = () => {
        dispatch(
            fetchPasswordRecovery(
                form.email.value
            )
        );
    };

    const resetPasswordHandler = () => {
        dispatch(
            fetchPasswordReset(
                form.password.value,
                form.confirmPassword.value,
                resetToken
            )
        );
    };

    const verifyHandler = () => {
        setCount(30);
        dispatch(dataVerification(token));
    };

    const emailActivationHandler = () => {
        navigate('/sign-in');
        dispatch(activationResetStateHandler());
    };

    const setStateHandler = schema => {
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const alertResetStateHandler = () => {
        let emailActivation = () => {
            navigate('/sign-in');
            dispatch(activationResetStateHandler());
        };
        let resetPassword  = () => {
            navigate('/sign-in');
            dispatch(passwordResetStateHandler());
        };
        let verifyEmail = () => {
            if (!verify) {
                navigate('/sign-in');
                dispatch(resetEmailVerificationStateHandler());
            } else {
                dispatch(resetEmailVerificationStateHandler());
            }
        };
        let resetState = () => {
            let authToggle = appService.authSwitch(type, {
                reset : '',
                verify: '',
                activation: '',
                in: authResetStateHandler,
                up: authResetStateHandler,
                recovery: passwordRecoveryStateHandler,
            });

            setForm(schema);
            setIsFormValid(false);
            dispatch(authToggle());
        };

        return appService.resetStateSwitch(type, {
            in: resetState,
            up: resetState,
            verify: verifyEmail,
            recovery: resetState,
            reset: resetPassword,
            activation: emailActivation,
        });
    };

    const input = (name, result, control) => (
        <Input
            result={result}
            type={control.type}
            value={control.value}
            autoComplete={control.autocomplete}
            strength={control.validation.strength}
            className={!error ? (!control.touched  ? 'input' :
                validationService.isInvalid(control.valid, control.touched, !!control.validation) || (control.validation.confirm &&
                    form.password.value !==  form.confirmPassword.value) ||
                    (control.validation.strength && result.score < 2) ? 'input error' : 'input success') : 'input error'
            }
            onChange={e => validationService.changeHandler(e, name, form, setStateHandler)}
        />
    );

    const expression = !error ?
        (!loading ? !isFormValid || email?.response ? 'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off')
        : 'auth__btn-off'
    ;

    const createAuthInput = (name, control) => markupService.inputTemplate(form, name, input, control);

    const markdown = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                <span onClick={() => setForm(schema)}>
                    {appService.authSwitch(type, {
                        reset: null,
                        verify: null,
                        recovery: null,
                        activation: null,
                        up: appService.checkLanguage() ? 'Воспользоваться' : 'Use',
                        in: appService.checkLanguage() ? 'Нет аккаунта? ' : 'Do not have an account?',
                    })}
                </span>
            </div>
            &nbsp;
            <div className={'auth__form--register-link'}>
                <Link to={appService.authSwitch(type, {
                    reset: '',
                    verify: '',
                    recovery: '',
                    activation: '',
                    in: '/sign-up',
                    up: '/sign-in',
                })}>
                    <div className={'auth__form--register-heading'}>
                        <span>
                            {appService.authSwitch(type, {
                                reset: null,
                                verify: null,
                                recovery: null,
                                activation: null,
                                up: appService.checkLanguage() ? 'аккаунтом' : 'account',
                                in: appService.checkLanguage() ? 'Зарегистрироваться' : 'Register now',
                            })}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </div>;

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || email || verify || passwordReset ? appService.authResponseSwitch(response) : null}
    </AlertPopup>;

    return (
        <>
            <div className={'auth__form'}>
                <div className={'auth__form--wrapper'}>
                    <div className={'auth__form--cell'}>
                        <div className={'auth__form--title'}>
                            <div
                                className={
                                    type === 'verify-email' || type === 'email-activation'
                                        ? 'auth__form--heading auth__form--verify' : 'auth__form--heading'
                                }
                            >
                                <span>
                                    {appService.authSwitch(type, {
                                        up: appService.checkLanguage() ? 'Регистрация' : 'Registration',
                                        in: appService.checkLanguage() ? 'Авторизация' : 'Authorization',
                                        reset: appService.checkLanguage() ? 'Установить пароль' : 'Set password',
                                        verify: appService.checkLanguage() ? 'Подтвердить почту' : 'Confirm mail',
                                        recovery: appService.checkLanguage() ? 'Забыли пароль?' : 'Forgot your password',
                                        activation: appService.checkLanguage() ? 'Активация пользователя' : 'User activation',
                                    })}
                                </span>
                            </div>
                        </div>
                        <form
                            className={'auth__form--entry'}
                            onClick={e =>  e.preventDefault()}
                        >
                            {appService.renderSwitch(type, form, children, createAuthInput)}
                            <div className={'auth__form--btn-cell'}>
                                <Button
                                    disabled={appService.authSwitch(type, {
                                        activation: true,
                                        verify: count !== 0,
                                        in: !error ? (!loading ? !isFormValid : true) : true,
                                        up: !error ? (!loading ? !isFormValid : true) : true,
                                        reset: !error ? (!loading ? !isFormValid : true) : true,
                                        recovery: !error ? (!loading ? !isFormValid : true) : true,
                                    })}
                                    className={appService.authSwitch(type, {
                                        in: expression,
                                        up: expression,
                                        reset: expression,
                                        recovery: expression,
                                        activation: 'auth__btn-on',
                                        verify: count !== 0 ? 'auth__btn-off' : 'auth__btn-on',
                                    })}
                                    onClick={appService.authSwitch(type, {
                                        in: loginHandler,
                                        up: registerHandler,
                                        verify: verifyHandler,
                                        reset: resetPasswordHandler,
                                        recovery: recoverPasswordHandler,
                                        activation: emailActivationHandler,
                                    })}>
                                    <div className={'auth__form--btn-heading'}>
                                        <span>
                                            {!loading ? appService.authSwitch(type, {
                                                in: appService.checkLanguage() ? 'Войти' : 'Sign in',
                                                up: appService.checkLanguage() ? 'Создать' : 'Sign up',
                                                reset: appService.checkLanguage() ? 'Установить' : 'Set',
                                                recovery: appService.checkLanguage() ? 'Сбросить' : 'Reset',
                                                activation: appService.checkLanguage() ? 'Войти' : 'Sign in',
                                                verify: count !== 0 ? count :
                                                    appService.checkLanguage() ? 'Отправить повторно' : 'Resend',
                                            }) : <BtnLoader/>}
                                        </span>
                                    </div>
                                </Button>
                            </div>
                            <div className={'auth__form--help'}>
                                <Link to={appService.authSwitch(type, {
                                    reset: '',
                                    verify: '',
                                    recovery: '/',
                                    activation: '',
                                    in: '/password-recovery',
                                    up: '/password-recovery',

                                })}>
                                    <div className={'auth__form--help-heading'}>
                                        <span>
                                            {appService.authSwitch(type, {
                                                reset: '',
                                                verify: '',
                                                activation: '',
                                                recovery: appService.checkLanguage() ? 'На главную' : 'To main',
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
                {appService.authSwitch(type, {
                    reset: null,
                    verify: null,
                    in: markdown,
                    up: markdown,
                    recovery: null,
                    activation: null,
                })}
            </div>
            
            {useIsOpened(response) && alert}
        </>
    );
};


AuthForm.propTypes = {
    type: PropTypes.string,
    token: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};


export default AuthForm;