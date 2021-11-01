import PropTypes from 'prop-types';
import useAuth from '../../../../hooks/auth-hook';
import Context from '../../../../context/Context';
import {Link, useHistory} from 'react-router-dom';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import useIsOpened from '../../../../hooks/open-alert-hook';
import {fetchRecoverPassword, passwordRecoveryStateHandler}
    from '../../../../redux/actions/recoverPasswordActions';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import {activationResetStateHandler} from '../../../../redux/actions/activateEmailActions';
import {fetchLogin, fetchRegister, authResetStateHandler} from '../../../../redux/actions/authActions';
import {getVerify, resetEmailVerificationStateHandler} from '../../../../redux/actions/verifyEmailActions';
import {fetchResetPassword, resetPasswordResetStateHandler} from '../../../../redux/actions/resetPasswordActions';


const AuthForm = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {type, token, schema, children, resetToken} = props;
    const {form, count, setForm, setCount} = useAuth(30, schema);
    const {appService, markupService, storageService, validationService} = useContext(Context);

    const authActions  = useSelector(state => appService.authSwitch(type, {
        in: state.getAuth,
        up: state.getAuth,
        verify: state.getVerify,
        activate: state.getActivate,
        reset: state.getResetPassword,
        recover: state.getRecoverPassword,
    }));

    const {error, email, verify, loading, resetPassword} = authActions;

    const response = error || email || verify || resetPassword ?
        error || resetPassword || email?.response || verify?.response : null;

    useEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (storageService.getItem('authToken') && parts.length === 2) {
            history.push('/features');
        }
    }, [history, storageService]);

    const loginHandler = () => {
        dispatch(
            fetchLogin(
                history,
                form.email.value,
                form.password.value
            )
        );
    };

    const registerHandler = () => {
        dispatch(
            fetchRegister(
                history,
                form.name.value,
                form.email.value,
                form.password.value
            )
        );
    };

    const recoverPasswordHandler = () => {
        dispatch(
            fetchRecoverPassword(
                form.email.value
            )
        );
    };

    const resetPasswordHandler = () => {
        dispatch(
            fetchResetPassword(
                form.password.value,
                form.confirmPassword.value,
                resetToken
            )
        );
    };

    const verifyHandler = () => {
        setCount(30);
        dispatch(getVerify(token));
    };

    const emailActivationHandler = () => {
        history.push('/sign-in');
        dispatch(activationResetStateHandler());
    };

    const setStateHandler = schema => {
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const alertResetStateHandler = () => {
        let activateEmail  = () => {
            history.push('/sign-in');
            dispatch(activationResetStateHandler());
        };
        let resetPassword  = () => {
            history.push('/sign-in');
            dispatch(resetPasswordResetStateHandler());
        };
        let verifyEmail = () => {
            if (!verify) {
                history.push('/sign-in');
                dispatch(resetEmailVerificationStateHandler());
            } else {
                dispatch(resetEmailVerificationStateHandler());
            }
        };
        let resetState = () => {
            let authToggle = appService.authSwitch(type, {
                reset : '',
                verify: '',
                activate: '',
                in: authResetStateHandler,
                up: authResetStateHandler,
                recover: passwordRecoveryStateHandler,
            });

            setForm(schema);
            setIsFormValid(false);
            dispatch(authToggle());
        };

        return appService.resetStateSwitch(type, {
            in: resetState,
            up: resetState,
            verify: verifyEmail,
            recover: resetState,
            reset: resetPassword,
            activate: activateEmail
        });
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
                    form.password.value !==  form.confirmPassword.value)
                //(control.validation.strength && result.score < 2)
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
                        <span onClick={() => setForm(schema)}>
                            {appService.authSwitch(type, {
                                reset: null,
                                verify: null,
                                recover: null,
                                activate: null,
                                up: appService.checkLanguage() ? 'Воспользоваться' : 'Use',
                                in: appService.checkLanguage() ? 'Нет аккаунта? ' : 'Do not have an account?'
                            })}
                        </span>
            </div>
            &nbsp;
            <div className={'auth__form--register-link'}>
                <Link to={appService.authSwitch(type, {
                    reset: '',
                    verify: '',
                    recover: '',
                    activate: '',
                    in: '/sign-up',
                    up: '/sign-in',
                })}>
                    <div className={'auth__form--register-heading'}>
                               <span>
                                    {appService.authSwitch(type, {
                                        reset: null,
                                        verify: null,
                                        recover: null,
                                        activate: null,
                                        up: appService.checkLanguage() ? 'аккаунтом' : 'account',
                                        in: appService.checkLanguage() ? 'Зарегистрироваться' : 'Register now'
                                    })}
                            </span>
                    </div>
                </Link>
            </div>
        </div>
    </div>;

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || email || verify || resetPassword ? appService.authResponseSwitch(response) : null}
    </AlertPopup>;

    return(
        <>
            <div className={'auth__form'}>
                <div className={'auth__form--wrapper'}>
                    <div className={'auth__form--cell'}>
                        <div className={'auth__form--title'}>
                            <div
                                className={
                                    type === 'verify-email' || type === 'activate-email'
                                        ? 'auth__form--heading auth__form--verify' : 'auth__form--heading'
                                }
                            >
                                <span>
                                    {appService.authSwitch(type, {
                                        up: appService.checkLanguage() ? 'Регистрация' : 'Registration',
                                        in: appService.checkLanguage() ? 'Авторизация' : 'Authorization',
                                        reset: appService.checkLanguage() ? 'Установить пароль' : 'Set password',
                                        verify: appService.checkLanguage() ? 'Подтвердить почту' : 'Confirm mail',
                                        recover: appService.checkLanguage() ? 'Забыли пароль?' : 'Forgot your password',
                                        activate: appService.checkLanguage() ? 'Активация пользователя' : 'User activation'
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
                                    // disabled={appService.authSwitch(type, {
                                    //     verify: count !== 0,
                                    //     in: !error ? (!loading ? !isFormValid : true) : true,
                                    //     up: !error ? (!loading ? !isFormValid : true) : true,
                                    //     reset: !error ? (!loading ? !isFormValid : true) : true,
                                    //     recover: !error ? (!loading ? !isFormValid : true) : true,
                                    // })}
                                    className={appService.authSwitch(type, {
                                        in: expression,
                                        up: expression,
                                        reset: expression,
                                        recover: expression,
                                        activate: 'auth__btn-on',
                                        verify: count !== 0 ? 'auth__btn-off' : 'auth__btn-on',
                                    })}
                                    onClick={appService.authSwitch(type, {
                                        in: loginHandler,
                                        up: registerHandler,
                                        verify: verifyHandler,
                                        reset: resetPasswordHandler,
                                        recover: recoverPasswordHandler,
                                        activate: emailActivationHandler,
                                    })}>
                                    <div className={'auth__form--btn-heading'}>
                                        <span>
                                            {!loading ? appService.authSwitch(type, {
                                                in: appService.checkLanguage() ? 'Войти' : 'Sign in',
                                                up: appService.checkLanguage() ? 'Создать' : 'Sign up',
                                                reset: appService.checkLanguage() ? 'Установить' : 'Set',
                                                recover: appService.checkLanguage() ? 'Сбросить' : 'Reset',
                                                activate: appService.checkLanguage() ? 'Войти' : 'Sign in',
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
                                    recover: '/',
                                    activate: '',
                                    in: '/recover-password',
                                    up: '/recover-password',

                                })}>
                                    <div className={'auth__form--help-heading'}>
                                        <span>
                                            {appService.authSwitch(type, {
                                                reset: '',
                                                verify: '',
                                                activate: '',
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
                {appService.authSwitch(type, {
                    reset: null,
                    verify: null,
                    in: markdown,
                    up: markdown,
                    recover: null,
                    activate: null,
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