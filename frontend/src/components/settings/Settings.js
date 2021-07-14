import React, {useEffect, useState} from 'react';
import AppService from '../../services/appService';
import Input from '../presentation/ui/input/Input';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../presentation/ui/button/Button';
import SignalPopup from '../container/popup/SignalPopup';
import Dropdown from '../presentation/ui/dropdown/Dropdown';
import BtnLoader from '../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../services/validationService';
import DataSchemasService from '../../services/dataSchemasService';
import currencyStorage from '../../json-storage/currencyStorage.json';
import {
    changeEmail,
    deleteAccount,
    fetchSettings,
    settingsReset,
    changePassword,
} from '../../redux/actions/settingsActions';


const Settings = () => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const schema = new DataSchemasService();
    const validationService = new ValidationService();
    const [value, setValue] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [email, setEmail] = useState(schema.changeEmailSchema());
    const settingsActions =  useSelector(state => state.getSettings);
    const [tab, setTab] = useState(schema.settingsSchema()[0].openTab);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [password, setPassword] = useState(schema.changePasswordSchema());
    const [deleteAcc, setDeleteAcc] = useState(schema.deleteAccountSchema());
    const [selected, setSelectedTabItem] = useState(schema.settingsSchema()[0].name);


    const {error, message, loading} = settingsActions;


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
                password.newPassword.value,
                password.confirmNewPassword.value,
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

    const clickTabItemHandler = name => setSelectedTabItem(name);

    const switchTabHandler = tab => {
        setTab(tab);
        let settings = {
            changeEmail: changeEmail,
            changeCurrency: changeCurrency,
            changePassword: changePassword,
            deleteAccount: deleteAccount,
        }
        function changeEmail() {
            setIsFormValid(false);
            setEmail(schema.changeEmailSchema());
        }
        function changeCurrency() {
            setValue(null);
            setIsFormValid(false);
        }
        function changePassword() {
            setIsFormValid(false);
            setPassword(schema.changePasswordSchema());
        }
        function deleteAccount() {
            setIsFormValid(false);
            setDeleteAcc(schema.deleteAccountSchema());
        }
        appService.toggleSettings(tab, settings);
    };

    const renderSettings = schema.settingsSchema().map((item, idx) => {
        const isItemSelected = selected === item.name;
        return(
            <li
                key={idx}
                onClick={() => switchTabHandler(item.openTab)}
            >
                <span
                    onClick={() => clickTabItemHandler(item.name)}
                    className={isItemSelected ? 'settings__item selected' : 'settings__item'}
                >{item.name}</span>
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
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            if (schema.hasOwnProperty('password')) {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid
            } else {
                return isFormValidLocal = isFormValidLocal && schema[name].value !== ''
                    && schema[name].valid && schema['newPassword'].value === schema['confirmNewPassword'].value;
            }

        });
        setIsFormValid(isFormValidLocal);
        schema.hasOwnProperty('password') ? setDeleteAcc(schema) : setPassword(schema);
    };

    const changeInputRender = (idx, name, control) => {
        let localSchemaHandler = control.type === 'password' ?
            control.label !== 'Введите пароль' ? password : deleteAcc : email;
        let localStateHandler = control.type === 'password' ? setStatePasswordHandler : setStateEmailHandler;
        return(
            <Input
                type={control.type}
                value={control.value}
                autoComplete={control.autocomplete}
                className={(!control.touched ? 'input' :
                    validationService.isInvalid(control.valid, control.touched, !!control.validation)
                        ? 'input error' : 'input success')}
                onChange={e => validationService.changeHandler(e, name, localSchemaHandler, localStateHandler)}
            />
        );
    };



    const validationError = control => {
        return  validationService.isInvalid(control.valid, control.touched, !!control.validation)
        || control.required ?
            <div className={'auth__form--input-error'}>
                <div className={'auth__form--input-title'}>
                    <span>{control.error || 'Введите верное значение'}</span>
                </div>
            </div>  : null
    }

    const createChangeEmail =(idx, name, control) => {
        return schema.authInputPattern(idx, name, changeInputRender, control, validationError);
    }

    const createChangePassword =(idx, name, control) => {
        return schema.authInputPattern(idx, name, changeInputRender, control, validationError);
    }

    const createDeleteAcc = (idx, name, control) => {
        return schema.authInputPattern(idx, name, changeInputRender, control, validationError);
    };

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
                        <div className={'settings__tab'}>
                            {tab === 0 && <form className={'auth__form--entry'} onClick={e => submitHandler(e)}>
                                {appService.objectIteration(email, createChangeEmail)}
                                <Button
                                    disabled={!isFormValid}
                                    onClick={changeEmailHandler}
                                    className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                ><span>{!loading ? 'Сменить' : <BtnLoader/>}</span></Button>
                            </form>}
                            {tab === 1 && <div className={'auth__form--entry'}>
                                <div className={'add__wrapper'}>
                                    <Dropdown
                                        value={value}
                                        setValue={setValue}
                                        options={currencyStorage}
                                        placeholder={'Выбрать валюту'}
                                    />
                                </div>

                                <Button
                                    disabled={!value}
                                    onClick={changeEmailHandler}
                                    className={!value ? 'auth__btn-off' : 'auth__btn-on'}
                                ><span>Обновить</span></Button>
                            </div>
                            }
                            {tab === 2 && <form className={'auth__form--entry'} onClick={e => submitHandler(e)}>
                                {appService.objectIteration(password, createChangePassword)}
                                <Button
                                    disabled={!isFormValid}
                                    onClick={changePasswordHandler}
                                    className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                ><span>{!loading ? 'Сменить' : <BtnLoader/>}</span></Button>
                            </form>}
                            {tab === 3 && <form className={'auth__form--entry'} onClick={e => submitHandler(e)}>
                                {appService.objectIteration(deleteAcc, createDeleteAcc)}
                                <div className={'settings__alarm'}>
                                    <h2 className={'settings__alarm--heading'}>
                                        Вы уверены, что хотите удалить свой аккаунт?
                                    </h2>
                                </div>
                                <Button
                                    disabled={!isFormValid}
                                    onClick={deleteAccountHandler}
                                    className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                ><span>{!loading ? 'Удалить' : <BtnLoader/>}</span></Button>
                            </form>}
                        </div>
                    </div>
                </div>
            </div>

            <SignalPopup
                error={error}
                schema={schema}
                type={'settings'}
                message={message}
                setEmail={setEmail}
                reset={settingsReset}
                setPassword={setPassword}
                setIsFormValid={setIsFormValid}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>{!message ? 'Не авторизован для доступа' : 'Данные обновлены'}</span>
                </div>
            </SignalPopup>
        </>
    );
};


export default Settings;