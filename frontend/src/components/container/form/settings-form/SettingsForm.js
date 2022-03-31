import {Link} from 'react-router-dom';
import Context from '../../../../context/Context';
import React, {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import useIsOpened from '../../../../hooks/open-alert-hook';
import Button from '../../../presentation/ui/button/Button';
import useValidation from '../../../../hooks/validation-hook';
import AlertPopup from '../../../presentation/ui/popup/AlertPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import {changeEmail, fetchSettings, deleteAccount, changePassword,
    settingsResetStateHandler} from '../../../../redux/actions/settingsActions';


const SettingsForm = props => {
    const {appService, markupService, storageService, validationService, dataSchemasService} = useContext(Context);
    const {type, email, setEmail, password, selected,  deleteAcc, setPassword, setDeleteAcc} = props;
    const settingsActions =  useSelector(state => state.getSettings);
    const {isFormValid, setIsFormValid} = useValidation();
    const {error, message, account, loading} = settingsActions;
    const path = window.location.pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings(path));
    }, [path, dispatch]);

    const response = error || message || account ? error || message || account : null;

    const changeEmailHandler = () => {
        dispatch(
            changeEmail(
                email.email.value
            )
        );
        setIsFormValid(false);
    };

    const changePasswordHandler = () => {
        dispatch(
            changePassword(
                password.oldPassword.value,
                password.password.value,
                password.confirmPassword.value,
            )
        );
        setIsFormValid(false);
    };

    const deleteAccountHandler = () => {
        dispatch(
            deleteAccount(
                deleteAcc.password.value
            )
        );
        setIsFormValid(false);
    };

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
            password() {setPassword(dataSchemasService.changePasswordSchema())}
        });
    };

    const alertResetStateHandler = () => {
        error || account ||  message === 'Not authorized to access this router' ? responseCloseHandler() : resetStateHandler();
    };

    const settingsRender = markupService.settingsPattern().map(val => {
        let isItemSelected = selected === val.name;
        return (
            <li>
                <Link to={`/settings${val.to}`} style={{textDecoration: 'none'}}>
                    <span className={isItemSelected ? 'settings__item selected' : 'settings__item'}
                    >{val.name}</span>
                </Link>
            </li>
        );
    });

    const setStateEmailHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid;
        });
        setEmail(schema);
        setIsFormValid(isFormValidLocal);
    };

    const setStatePasswordHandler = schema => {
        let isFormValidLocal = validationService.setAuthStateHandler(schema);
        setIsFormValid(isFormValidLocal);
        schema.hasOwnProperty('oldPassword') ? setPassword(schema) : setDeleteAcc(schema);
    };

    const changeInputRender = (name, result, control) => {
        let localSchemaHandler = control.type === 'password' ?
            control.label !== 'Введите пароль' ? password : deleteAcc : email;
        let localStateHandler = control.type === 'password' ? setStatePasswordHandler : setStateEmailHandler;

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
    };

    const alert = <AlertPopup onReset={alertResetStateHandler}>
        {error || message || account ? appService.budgetResponseSwitch(response) : null}
    </AlertPopup>;

    const form = appService.settingsSwitch(type, {email: email, password: password, account: deleteAcc});
    const createSetting = (name, control) => markupService.inputPattern(form, name, changeInputRender, control);

    return (
        <>
            <div className={'settings'}>
                <div className={'settings__header'}>
                    <div className={'settings__header--title'}>
                        {appService.checkLanguage() ? 'Настройки' : 'Settings'}
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
                                <form className={'auth__form--entry'} onClick={e => e.preventDefault()}>
                                    {appService.objectIteration(appService.settingsSwitch(type, {
                                        email: email,
                                        password: password,
                                        account: deleteAcc,
                                    }), createSetting)}
                                    {
                                        type === 'delete-account' ?
                                            <div className={'settings__alarm'}>
                                                <h2 className={'settings__alarm--heading'}>
                                                    {
                                                        appService.checkLanguage() ?
                                                            'Вы уверены, что хотите удалить свой аккаунт?' :
                                                            'Are you sure you want to delete your account?'
                                                    }
                                                </h2>
                                            </div> : null
                                    }
                                    <Button
                                        disabled={!isFormValid}
                                        onClick={appService.settingsSwitch(type, {
                                            email: changeEmailHandler,
                                            account: deleteAccountHandler,
                                            password: changePasswordHandler
                                        })}
                                        className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                    >
                                        <span>
                                            {
                                                !loading ? appService.settingsSwitch(type, {
                                                    email: appService.checkLanguage() ? 'Сменить' : 'Change',
                                                    account: appService.checkLanguage() ? 'Удалить' : 'Delete',
                                                    password: appService.checkLanguage() ? 'Установить' : 'Set'
                                                }) : <BtnLoader/>
                                            }
                                        </span>
                                    </Button>
                                </form>
                            </div> : null}
                        </div>
                    </div>
                </div>

                {useIsOpened(response) && alert}
            </>
        );
};


export default SettingsForm;