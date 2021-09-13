import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import SignalPopup from '../../popup/SignalPopup';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import AppService from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import MarkupService from '../../../../services/markupService';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../../../services/validationService';
import DataSchemasService from '../../../../services/dataSchemasService';
import {
    changeEmail,
    fetchSettings,
    settingsReset,
    deleteAccount,
    changePassword,
} from '../../../../redux/actions/settingsActions';


const SettingsForm = props => {
    const {type, email, setEmail, language, password, selected,  deleteAcc, setPassword, setDeleteAcc} = props;
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const settingsActions =  useSelector(state => state.getSettings);
    const [isFormValid, setIsFormValid] = useState(false);
    const validationService = new ValidationService();
    const {error, message, loading} = settingsActions;
    const markupService = new MarkupService(language);
    const schemaService = new DataSchemasService();
    const appService = new AppService();
    const dispatch = useDispatch();

    const response = error || message ? error || message : null;

    useEffect(() => {
        dispatch(fetchSettings(setErrorPopupOpen));
    }, [dispatch]);

    const submitHandler = e => e.preventDefault();

    const changeEmailHandler = () => {
        dispatch(
            changeEmail(
                email.email.value,
                setErrorPopupOpen
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
                setErrorPopupOpen
            )
        );
        setIsFormValid(false);
    };

    const deleteAccountHandler = () => {
        dispatch(
            deleteAccount(
                deleteAcc.password.value,
                setErrorPopupOpen
            )
        );
        setIsFormValid(false);
    };

    const renderSettings = markupService.settingsPattern().map((item, idx) => {
        let isItemSelected = selected === item.name;
        return(
            <li key={idx}>
                <Link to={`/settings${item.to}`} style={{textDecoration: 'none'}}>
                    <span className={isItemSelected ? 'settings__item selected' : 'settings__item'}
                    >{item.name}</span>
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
        let isFormValidLocal = validationService.setStateHandler(schema);
        setIsFormValid(isFormValidLocal);
        schema.hasOwnProperty('oldPassword') ? setPassword(schema) : setDeleteAcc(schema);
    };

    const changeInputRender = (idx, name, result, control) => {
        let localSchemaHandler = control.type === 'password' ?
            control.label !== 'Введите пароль' ? password : deleteAcc : email;
        let localStateHandler = control.type === 'password' ? setStatePasswordHandler : setStateEmailHandler;
        return(
            <Input
                result={result}
                type={control.type}
                value={control.value}
                autoComplete={control.autocomplete}
                className={(!control.touched ? 'input' :
                    validationService.isInvalid(control.valid, control.touched, !!control.validation) ||
                    (control.validation.confirm && form.password.value !== form.confirmPassword.value) ||
                    (control.validation.strength && result.score < 2) ?
                        'input error' : 'input success')
                }
                onChange={e => validationService.changeHandler(e, name, localSchemaHandler, localStateHandler)}
            />
        );
    };

    const form = appService.settingsToggle(type, {email: email, password: password, account: deleteAcc});
    const createSetting =(idx, name, control) =>
        markupService.inputPattern(idx, form, name, changeInputRender, control);

    return(
        <>
            <div className={'settings'}>
                <div className={'settings__header'}>
                    <div className={'settings__header--title'}>Настройки</div>
                </div>

                <div className={'settings__container'}>
                    <div className={'settings__left-column'}>
                        <ul className={'settings__column'}>
                            {renderSettings}
                        </ul>
                    </div>

                    <div className={'settings__tabs'}>
                        {
                            type !=='settings' ? <div className={'settings__tab'}>
                                <form className={'auth__form--entry'} onClick={e => submitHandler(e)}>
                                    {appService.objectIteration(appService.settingsToggle(type, {
                                        email: email,
                                        password: password,
                                        account: deleteAcc,
                                    }), createSetting)}
                                    {
                                        type === 'delete-account' ?
                                            <div className={'settings__alarm'}>
                                                <h2 className={'settings__alarm--heading'}>
                                                    {
                                                        appService.checkLanguage(language) ?
                                                            'Вы уверены, что хотите удалить свой аккаунт?' :
                                                            'Are you sure you want to delete your account?'
                                                    }
                                                </h2>
                                            </div> : null
                                    }
                                    {
                                        type !== 'settings' ?
                                            <Button
                                                disabled={!isFormValid}
                                                onClick={appService.settingsToggle(type, {
                                                    email: changeEmailHandler,
                                                    account: deleteAccountHandler,
                                                    password: changePasswordHandler
                                                })}
                                                className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                            ><span>{
                                                !loading ? appService.settingsToggle(type, {
                                                    email: appService.checkLanguage(language) ? 'Сменить' : 'Change',
                                                    account: appService.checkLanguage(language) ? 'Удалить' : 'Delete',
                                                    password: appService.checkLanguage(language) ? 'Установить' : 'Set'
                                                }) : <BtnLoader/>}
                                            </span></Button> : null
                                    }
                                </form>
                            </div> : null}
                        </div>
                    </div>
                </div>

                <SignalPopup
                    type={type}
                    error={error}
                    message={message}
                    setEmail={setEmail}
                    language={language}
                    reset={settingsReset}
                    schema={schemaService}
                    setPassword={setPassword}
                    setIsFormValid={setIsFormValid}
                    errorPopupOpen={errorPopupOpen}
                    setErrorPopupOpen={setErrorPopupOpen}
                >
                    <div className={'error-popup__error'}>
                        <span>{error || message ? appService.budgetResponseToggle(response, language) : null}</span>
                    </div>
                </SignalPopup>
            </>
        );
};


export default SettingsForm;