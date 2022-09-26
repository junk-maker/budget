import PropTypes from 'prop-types';
import useAuth from '../../../../hooks/auth-hook';
import Context from '../../../../context/Context';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useIsOpened from '../../../../hooks/open-alert-hook';
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import React, {memo, useMemo, useEffect, useContext, useCallback} from 'react';
import {activationResetStateHandler} from '../../../../redux/slice/emailActivationSlice';
import {actionToSignIn, actionToSignUp, authResetStateHandler} from '../../../../redux/slice/authSlice';
import {actionToPasswordReset, resetPasswordResetStateHandler} from '../../../../redux/slice/passwordResetSlice';
import {dataVerification, resetEmailVerificationStateHandler} from '../../../../redux/slice/verifyEmailSlice';
import {actionToPasswordRecovery, resetPasswordRecoveryStateHandler} from '../../../../redux/slice/passwordRecoverySlice';

const Authorization = memo(({type, token, schema, children, resetToken}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {form, count, setForm, setCount} = useAuth(30, type, schema);
    const {appService, sliceService, markupService, storageService, validationService} = useContext(Context);
    const {register, error, email, verification, loading, passwordReset} = useSelector(state => sliceService.getAuth(state)[type]);
    // console.log(error)

    const response = error || email || verification || passwordReset ?
        error || passwordReset || email?.response || verification?.response : null
    ;
    // console.log(error)
    const loginData = useMemo(() => {return {
        type,
        navigate,
        email: form?.email?.value,
        password: form?.password?.value,
    }}, [type, navigate, form?.email?.value, form?.password?.value]);

    const registerData = useMemo(() => {return {
        type,
        navigate,
        name: form?.name?.value,
        email: form?.email?.value,
        password: form?.password?.value,
    }}, [type, navigate, form?.name?.value, form?.email?.value, form?.password?.value]);

    const passwordRecoveryData = useMemo(() => {return {
        type,
        email: form?.email?.value,
    }}, [type, form?.email?.value]);

    const passwordResetData = useMemo(() => {return {
        type,
        resetToken,
        password: form?.password?.value,
        confirmPassword: form?.confirmPassword?.value,

    }}, [type, resetToken, form?.password?.value, form?.confirmPassword?.value]);

    const verificationData = useMemo(() => {return {
        type,
        token,
    }}, [type, token]);

    useEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (storageService.getItem('authToken') && parts.length === 2) return navigate('/features');
    }, [navigate, storageService]);

    const loginHandler = useCallback(() => {
        dispatch(actionToSignIn(loginData));
    }, [dispatch, loginData]);

    const registerHandler = useCallback(() => {
        dispatch(actionToSignUp(registerData));
    }, [dispatch, registerData]);

    const resetPasswordHandler = useCallback(() => dispatch(actionToPasswordReset(passwordResetData)), [dispatch, passwordResetData]);

    const recoverPasswordHandler = useCallback(() => dispatch(actionToPasswordRecovery(passwordRecoveryData)), [dispatch, passwordRecoveryData]);

    const verifyHandler = useCallback(() => {
        setCount(30);
        dispatch(dataVerification(verificationData));
    }, [setCount, dispatch, verificationData]);

    const emailActivationHandler = useCallback(() => {
        navigate('/sign-in');
        dispatch(activationResetStateHandler());
    }, [dispatch, navigate]);

    const setStateHandler = useCallback(schema => {
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setForm(schema);
        setIsFormValid(isFormValidLocal);
    }, [setForm, setIsFormValid, validationService]);

    const alertResetStateHandler = useCallback(() => {
        let emailActivation = () => {
            navigate('/sign-in');
            dispatch(activationResetStateHandler());
        };
        let resetPassword  = () => {
            navigate('/sign-in');
            dispatch(resetPasswordResetStateHandler());
        };
        let verifyEmail = () => {
            if (!verification) {
                navigate('/sign-in');
                dispatch(resetEmailVerificationStateHandler());
            } else {
                dispatch(resetEmailVerificationStateHandler());
            };
        };

        let resetState = () => {
            let toggle = {
                'sign-in': authResetStateHandler(),
                'sign-up': authResetStateHandler(),
                'password-recovery': resetPasswordRecoveryStateHandler(),
            }[type];

            setForm(schema);
            dispatch(toggle);
            setIsFormValid(false); 
        };

        return {
            'sign-in':  resetState,
            'sign-up':  resetState,
            'verify-email': verifyEmail,
            'password-recovery': resetState,
            'password-reset': resetPassword,
            'email-activation': emailActivation,
        }[type]();
    }, [type, schema, dispatch, navigate, setForm, verification, setIsFormValid]);

    const input = useCallback((name, result, control) => (
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
    ), [form, error, setStateHandler, validationService]);

    const classNameExpression = useMemo(() => !error ?
        (!loading ? !isFormValid || email?.response ? 'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off') : 'auth__btn-off', [error, loading, email?.response, isFormValid]
    );

    const createAuthInput = useCallback((name, control) => markupService.inputTemplate(form, name, input, control), [form, input, markupService]);

    const markup = useMemo(() => <div className={'auth__form-toggle'}>
        <div className={'auth__form-toggle__cell'}>
            <div className={'auth__form-toggle__title'}>
                <span>{markupService.authToggleTemplate()[type]}</span>
            </div>
            &nbsp;
            <div className={'auth__form-toggle__link'}>
                <Link to={appService.authLink()[type]}>
                    <div className={'auth__form-toggle__heading'}>
                        <span>{markupService.authToggleLinkTemplate()[type]}</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>, [type, appService, markupService]);

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || email || verification || passwordReset ? appService.authResponse()[response] : null}
    </AlertPopup>;

    const classNameForTitle = useMemo(() => type === 'verify-email' || type === 'email-activation'? 'auth__form-heading auth__form-verify' : 'auth__form-heading', [type]);

    const disabledForButton = useMemo(() => {
        return {
            'email-activation': true,
            'verify-email': count !== 0,
            'sign-in': !error ? (!loading ? !isFormValid : true) : true,
            'sign-up': !error ? (!loading ? !isFormValid : true) : true,
            'password-reset': !error ? (!loading ? !isFormValid : true) : true,
            'password-recovery': !error ? (!loading ? !isFormValid : true) : true,
        }[type];
    }, [type, count, error, loading, isFormValid]);

    const classNameForButton = useMemo(() => {
        return {
            'sign-in': classNameExpression,
            'sign-up': classNameExpression,
            'email-activation': 'auth__btn-on',
            'password-reset': classNameExpression,
            'password-recovery': classNameExpression,
            'verify-email': count !== 0 ? 'auth__btn-off' : 'auth__btn-on',
        }[type];
    }, [type, count, classNameExpression]);

    const onClickForButton = useMemo(() => {
        return {
            'sign-in': loginHandler,
            'sign-up': registerHandler,
            'verify-email': verifyHandler,
            'password-reset': resetPasswordHandler,
            'email-activation': emailActivationHandler,
            'password-recovery': recoverPasswordHandler,
        }[type];
    }, [type, loginHandler, registerHandler, verifyHandler, resetPasswordHandler, emailActivationHandler, recoverPasswordHandler]);

    const authToggleHelpTemplate = useMemo(() => markupService.authToggleHelpTemplate(markup)[type], [type, markup, markupService]);

    const authHelpLink = useMemo(() => <Link to={appService.authHelpLink()[type]}>
        <div className={'auth__form-help__heading'}>
            <span>{markupService.authHelpTemplate()[type]}</span>
        </div>
    </Link>, [type, appService, markupService]);

    const renderSwitch = useMemo(() => appService.renderSwitch(type, form, children, createAuthInput), [type, form, children, appService, createAuthInput]);

    return (
        <>
            <div className={'auth__form'}>
                <div className={'auth__form-wrapper'}>
                    <div className={'auth__form-cell'}>
                        <div className={'auth__form-title'}>
                            <div className={classNameForTitle}>
                                <span>{markupService.authHeadingTemplate()[type]}</span>
                            </div>
                        </div>
                        <form
                            className={'auth__form-entry'}
                            onClick={e =>  e.preventDefault()}
                        >
                            {renderSwitch}
                            <div className={'auth__form-btn'}>
                                <Button
                                    onClick={onClickForButton}
                                    disabled={disabledForButton}
                                    className={classNameForButton}
                                >
                                    <div className={'auth__form-btn__title'}>
                                        <span>
                                            {!loading ? markupService.authButtonTemplate(count)[type] : <BtnLoader/>}
                                        </span>
                                    </div>
                                </Button>
                            </div>
                            {
                                type === 'sign-in' || type === 'sign-up' || type === 'password-recovery' ? <div className={'auth__form-help'}>
                                    {authHelpLink}
                                </div> : null
                            }
                        </form>
                    </div>
                </div>
                {authToggleHelpTemplate}
            </div>
            
            {useIsOpened(response) && alert}
        </>
    );
});

Authorization.propTypes = {
    type: PropTypes.string,
    token: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};

export default Authorization;