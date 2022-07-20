import PropTypes from 'prop-types';
import useAuth from '../../../../hooks/auth-hook';
import Context from '../../../../context/Context';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import useIsOpened from '../../../../hooks/open-alert-hook';
import {fetchPasswordRecovery, passwordRecoveryStateHandler}
    from '../../../../redux/actions/passwordRecoveryActions'
;
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import React, {useMemo, useEffect, useContext, useCallback} from 'react';
import {activationResetStateHandler} from '../../../../redux/actions/emailActivationActions';
import {fetchLogin, fetchRegister, authResetStateHandler} from '../../../../redux/actions/authActions';
import {fetchPasswordReset, passwordResetStateHandler} from '../../../../redux/actions/passwordResetActions';
import {dataVerification, resetEmailVerificationStateHandler} from '../../../../redux/actions/verifyEmailActions';


const Authorization = ({type, token, schema, children, resetToken}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isFormValid, setIsFormValid} = useValidation();
    const {form, count, setForm, setCount} = useAuth(30, type, schema);
    const {appService, markupService, storageService, validationService} = useContext(Context);
    
    const authActions = useSelector(state => {
        return {
            'sign-in': state.getAuth,
            'sign-up': state.getAuth,
            'verify-email': state.getVerify,
            'email-activation': state.getActivation,
            'password-reset': state.getPasswordReset,
            'password-recovery': state.getPasswordRecovery,
        }[type];
    });

    const {error, email, verify, loading, passwordReset} = authActions;

    const response = error || email || verify || passwordReset ?
        error || passwordReset || email?.response || verify?.response : null
    ;

    useEffect(() => {
        let path = window.location.pathname;
        let parts = path.split('/');
        if (storageService.getItem('authToken') && parts.length === 2) return navigate('/features');
    }, [navigate, storageService]);

    const loginHandler = useCallback(() => {
        dispatch(
            fetchLogin(
                navigate,
                form.email.value,
                form.password.value
            )
        );
    }, [dispatch, navigate, form?.email?.value, form?.password?.value]);

    const registerHandler = useCallback(() => {
        dispatch(
            fetchRegister(
                navigate,
                form.name.value,
                form.email.value,
                form.password.value
            )
        );
    }, [dispatch, navigate, form?.name?.value, form?.email?.value, form?.password?.value]);

    const recoverPasswordHandler = useCallback(() => dispatch(fetchPasswordRecovery(form.email.value)), [dispatch, form?.email?.value]);

    const resetPasswordHandler = useCallback(() => {
        dispatch(
            fetchPasswordReset(
                form.password.value,
                form.confirmPassword.value,
                resetToken
            )
        );
    }, [dispatch, resetToken, form?.password?.value, form?.confirmPassword?.value]);

    const verifyHandler = useCallback(() => {
        setCount(30);
        dispatch(dataVerification(token));
    }, [token, setCount, dispatch]);

    const emailActivationHandler = useCallback(() => {
        navigate('/sign-in');
        dispatch(activationResetStateHandler());
    }, [dispatch, navigate]);

    const setStateHandler = useCallback(schema => {
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setForm(schema);
        setIsFormValid(isFormValidLocal);
    }, [setForm, setIsFormValid, validationService]);

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
            };
        };
        let resetState = () => {
            let authToggle = {
                'sign-in': authResetStateHandler(),
                'sign-up': authResetStateHandler(),
                'password-recovery': passwordRecoveryStateHandler(),
            }[type];

            setForm(schema);
            dispatch(authToggle);
            setIsFormValid(false); 
        };

        return {
            'sign-in': resetState,
            'sign-up': resetState,
            'verify-email': verifyEmail,
            'password-recovery': resetState,
            'password-reset': resetPassword,
            'email-activation': emailActivation,
        }[type]();
    };

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
        {error || email || verify || passwordReset ? appService.authResponse()[response] : null}
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
};


Authorization.propTypes = {
    type: PropTypes.string,
    token: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};


export default Authorization;