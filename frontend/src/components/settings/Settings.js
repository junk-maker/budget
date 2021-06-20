import React, {useState} from 'react';
import AppService from '../../services/appService';
import Input from '../presentation/ui/input/Input';
import Button from '../presentation/ui/button/Button';
import Dropdown from '../presentation/ui/dropdown/Dropdown';
import ValidationService from '../../services/validationService';
import DataSchemasService from '../../services/dataSchemasService';
import currencyStorage from '../../json-storage/currencyStorage.json';


const Settings = () => {
    const appService = new AppService();
    const schema = new DataSchemasService();
    const validationService = new ValidationService();
    const [value, setValue] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [email, setEmail] = useState(schema.changeEmailSchema());
    const [tab, setTab] = useState(schema.settingsSchema()[0].openTab);
    const [password, setPassword] = useState(schema.changePasswordSchema());
    const [selected, setSelectedTabItem] = useState(schema.settingsSchema()[0].name);

    const submitHandler = e => e.preventDefault();

    const changeEmailHandler = () => {
        console.log('work');
    };

    // const changePasswordHandler = () => {
    //     console.log('work');
    // };

    const clickTabItemHandler = name => setSelectedTabItem(name);

    const switchTabHandler = tab => {
        setTab(tab);
        let settings = {
            changeEmail: changeEmail,
            changeCurrency: changeCurrency,
            changePassword: changePassword,
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
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '' && schema[name].valid ;
        });
        setEmail(schema);
        setIsFormValid(isFormValidLocal);
    };

    const setStatePasswordHandler = schema => {
        let isFormValidLocal = true;
        Object.keys(schema).map(name => {
            return isFormValidLocal = isFormValidLocal && schema[name].value !== '' &&
                schema['oldPassword'].value === schema['newPassword'].value === schema['confirmNewPassword'].value;
        });
        setPassword(schema);
        setIsFormValid(isFormValidLocal);
    };

    const changeInputRender = (idx, name, control) => {
        let localSchemaHandler = control.type === 'password' ? password : email;
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

    return(
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
                    {tab === 0 && <form className={'auth__form--entry'} onClick={e => submitHandler(e)}>
                        {appService.objectIteration(email, createChangeEmail)}
                        <Button
                            disabled={!isFormValid}
                            onClick={changeEmailHandler}
                            className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        ><span>Выбрать</span></Button>
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
                            onClick={changeEmailHandler}
                            className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                        ><span>Обновить</span></Button>
                    </form>}
                </div>
            </div>
        </div>
    );
};


export default Settings;