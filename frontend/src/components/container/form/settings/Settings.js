import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Context from '../../../../context/Context';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import useIsOpened from '../../../../hooks/open-alert-hook';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import React, {memo, useMemo, useEffect, useContext, useCallback} from 'react';
import {actionToSettings, actionToChangeEmail, actionToDeleteAccount, 
    actionToChangePassword, settingsResetStateHandler} from '../../../../redux/slice/settingsSlice'
;

const Settings = memo(({type, email, setEmail, password, selected,  deleteAcc, setPassword, setDeleteAcc}) => {
    const {appService, markupService, storageService, validationService, dataSchemasService} = useContext(Context);
    const settingsActions =  useSelector(state => state.settings);
    const {error, message, account, loading} = settingsActions;
    const {isFormValid, setIsFormValid} = useValidation();
    const changePasswordType = 'change-password';
    const deleteAccountType = 'delete-account';
    const changeEmailType = 'change-email';
    const settingsType = 'settings';
    const dispatch = useDispatch();
    
    const settingsData = useMemo(() => {return {
        type: settingsType,
    }}, [settingsType]);

    const changeEmailData = useMemo(() => {return {
        type: changeEmailType,
        email: email?.email?.value,
    }}, [changeEmailType, email?.email?.value]);

    const deleteAccountData = useMemo(() => {return {
        type: deleteAccountType,
        password: deleteAcc?.password?.value,
    }}, [deleteAccountType, deleteAcc?.password?.value]);

    const changePasswordData = useMemo(() => {return {
        type: changePasswordType,
        password: password?.oldPassword?.value,
        newPassword: password?.password?.value,
        confirmPassword: password?.confirmPassword?.value,
    }}, [changePasswordType, password?.oldPassword?.value, password?.password?.value, password?.confirmPassword?.value]);
    
    useEffect(() => {
        dispatch(actionToSettings(settingsData));
    }, [dispatch, settingsData]);

    const response = error || message || account ? error || message || account : null;
    const menuItems = useMemo(() => markupService.settingsTemplate(), [markupService]);

    const changeEmailHandler = useCallback(() => {
        setIsFormValid(false);
        dispatch(actionToChangeEmail(changeEmailData));
    }, [dispatch, setIsFormValid, changeEmailData]);

    const changePasswordHandler = useCallback(() => {
        setIsFormValid(false);
        dispatch(actionToChangePassword(changePasswordData));
    }, [dispatch, setIsFormValid, changePasswordData]);

    const deleteAccountHandler = useCallback(() => {
        setIsFormValid(false);
        dispatch(actionToDeleteAccount(deleteAccountData));
    }, [dispatch, setIsFormValid, deleteAccountData]);

    const responseCloseHandler = () => {
        window.location.reload();
        dispatch(settingsResetStateHandler());
        storageService.removeItem('authToken');
    };

    const resetStateHandler = () => {
        setIsFormValid(false);
        dispatch(settingsResetStateHandler());
        appService.settingsFormSwitch(type, {
            email() {setEmail(dataSchemasService.changeEmailSchema())},
            account() {setDeleteAcc(dataSchemasService.deleteAccountSchema())},
            password() {setPassword(dataSchemasService.changePasswordSchema())},
        });
    };

    const alertResetStateHandler = () => {
        error || account ||  message === 'Not authorized to access this router' ? responseCloseHandler() : resetStateHandler();
    };

    const settingsRender = useMemo(() => menuItems.map(val => {
        let isItemSelected = selected === val.name;

        return (
            <li key={val.id} style={{paddingBottom: '2.5em'}}>
                <Link to={`/settings${val.to}`} style={{textDecoration: 'none'}}>
                    <span className={isItemSelected ? 'settings__item selected' : 'settings__item'}
                    >{val.name}</span>
                </Link>
            </li>
        );
    }), [selected, menuItems]);

    const setStateEmailHandler = useCallback(schema => {
        setEmail(schema);
        let isFormValidLocal = true;
        setIsFormValid(isFormValidLocal);
        Object.keys(schema).map(name => isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid);
    }, [setEmail, setIsFormValid]);

    const setStatePasswordHandler = useCallback(schema => {
        schema.hasOwnProperty('oldPassword') ? setPassword(schema) : setDeleteAcc(schema);
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setIsFormValid(isFormValidLocal);
    }, [setPassword, setDeleteAcc, setIsFormValid, validationService]);

    const form = useMemo(() => {
        return {'change-email': email, 'change-password': password, 'delete-account': deleteAcc}[type];
    }, [type, email, password, deleteAcc]);

    const changeInputRender = useCallback((name, result, control) => {
        let localStateHandler = control.type === 'password' ? setStatePasswordHandler : setStateEmailHandler;
        let localSchemaHandler = control.type === 'password' ? control.validation.delete !== true ? password : deleteAcc : email;

        return (
            <Input
                result={result}
                type={control.type}
                value={control.value}
                autoComplete={control.autocomplete}
                className={(!control.touched ? 'input' :
                    validationService.isInvalid(control.valid, control.touched, !!control.validation) ||
                    (control.validation.confirm && form.password.value !== form.confirmPassword.value) ||
                    (control.validation.strength && result.score < 2) ? 'input error' : 'input success')
                }
                onChange={e => validationService.changeHandler(e, name, localSchemaHandler, localStateHandler)}
            />
        );
    }, [email, password, deleteAcc, validationService, form.password?.value, setStateEmailHandler, form.confirmPassword?.value, setStatePasswordHandler]);

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || message || account ? appService.budgetResponse()[response] : null}
    </AlertPopup>;

    const createSetting = useCallback((name, control) => markupService.inputTemplate(form, name, changeInputRender, control), [form, markupService, changeInputRender]);

    const inputIteration = useMemo(() => {
        return appService.objectIteration({
            'change-email': email,
            'change-password': password,
            'delete-account': deleteAcc,
        }[type], createSetting);
    }, [type, email, password, deleteAcc, appService, createSetting]);

    const onClickForButton = useMemo(() => {
        return {
            'change-email': changeEmailHandler,
            'delete-account': deleteAccountHandler,
            'change-password': changePasswordHandler,
        }[type];
    }, [type, changeEmailHandler, deleteAccountHandler, changePasswordHandler]);

    return (
        <>
            <div className={'settings__header'}>
                <div className={'settings__header-title'}>
                    {markupService.settingsHeadingTemplate()['title']}
                </div>
            </div>

            <div className={'settings__container'}>
                <div className={'settings__left-column'}>
                    <ul className={'settings__column'}>
                        {settingsRender}
                    </ul>
                </div>

                <div className={'settings__tabs'}>
                    {
                        type !=='settings' ? <div className={'settings__tab'}>
                            <form className={'auth__form-entry'} onClick={e => e.preventDefault()}>
                                {inputIteration}
                                {
                                    type === 'delete-account' ?
                                        <div className={'settings__alarm'}>
                                            <h2 className={'settings__alarm-heading'}>
                                                {markupService.settingsHeadingTemplate()['delete-account']}
                                            </h2>
                                        </div>
                                    : null
                                }
                                <Button
                                    disabled={!isFormValid}
                                    onClick={onClickForButton}
                                    className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                >
                                    <span>
                                        {
                                            !loading ? {
                                                'change-password': markupService.settingsHeadingTemplate()['set'],
                                                'change-email': markupService.settingsHeadingTemplate()['change'],
                                                'delete-account': markupService.settingsHeadingTemplate()['delete'],
                                            }[type] : <BtnLoader/>
                                        }
                                    </span>
                                </Button>
                            </form>
                        </div> : null
                    }
                </div>
            </div>

            {useIsOpened(response) && alert}
        </>
    );
});

Settings.propTypes = {
    type: PropTypes.string, 
    email: PropTypes.object, 
    setEmail: PropTypes.func, 
    password: PropTypes.object, 
    selected: PropTypes.string,  
    deleteAcc: PropTypes.object, 
    setPassword: PropTypes.func, 
    setDeleteAcc: PropTypes.func,
};

export default Settings;