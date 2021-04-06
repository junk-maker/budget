import React, {useState} from 'react';
import Button from '../../ui/button/Button';
import {Link} from 'react-router-dom';
import Input from '../../ui/input/Input';
import AppService from '../../../services/appService';
import ValidationService from '../../../services/validationService';


const AuthForm = props => {
    const{type ,schema} = props;
    const app = new AppService();
    const [form, setForm] = useState(schema);
    const validation = new ValidationService();
    const [isFormValid, setIsFormValid] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
    };


    const onChangeHandler = (...args) => {
        const [e, name, form, callback] = args;
        validation.changeHandler(e, name, form, callback);
    };

    const loginHandler = async () => {};

    const registerHandler = async () => {};

    const setStateHandler = (...args) => {
        const [schema] = args;
        let isFormValidLocal = true;

        Object.keys(schema).map(name => {
            return isFormValidLocal = schema[name].valid && isFormValidLocal && schema[name].value !== '';
        });

        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const createInput = (...args) => {
        const [idx, name, control] = args;
        let htmlFor = `${control.type}-${Math.random()}`;
        return (
            <div className={'auth__form--input'} key={idx}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span>{control.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            <Input
                                type={control.type}
                                value={control.value}
                                className={!control.touched ? 'input' :
                                    validation.isInvalid(control.valid, control.touched, !!control.validation) ?
                                        'input input__error' : 'input input__success'}
                                onChange={e => onChangeHandler(e, name, form, setStateHandler)}
                            />
                        </div>
                        {
                            validation.isInvalid(control.valid, control.touched, !!control.validation)
                            || control.required ?
                                <div className={'auth__form--input-error'}>
                                    <div className={'auth__form--input-title'}>
                                        <span>{control.error || 'Введите верное значение'}</span>
                                    </div>
                                </div>  : null
                        }
                    </div>
                </div>
            </div>
        );
    };

    const inputRender = () => app.inputLoop(form, createInput);

    return(
        <div className={'auth__form'}>
            <div className={'auth__form--wrapper'}>
                <div className={'auth__form--cell'}>
                    <div className={'auth__form--title'}>
                        <div className={'auth__form--heading'}>
                                    <span>
                                        {type ? 'Авторизация' : 'Регистрация'}
                                    </span>
                        </div>
                    </div>
                    <form className={'auth__form--entry'}
                          onClick={submitHandler}
                    >
                        {inputRender()}
                        <div className={'auth__form--btn-cell'}>
                            <Button
                                disabled={!isFormValid}
                                className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                onClick={type ? registerHandler : loginHandler}
                            >
                                <div className={'auth__form--btn-heading'}>
                                            <span>
                                                {type ?
                                                    'Войти' : 'Создать'
                                                }
                                            </span>
                                </div>
                            </Button>
                        </div>
                        <div className={'auth__form--help'}>
                            <Link to={'/help'}>
                                <div className={'auth__form--help-heading'}>
                                    <span>Нужна помощь?</span>
                                </div>

                            </Link>
                        </div>
                    </form>

                </div>
            </div>
            <div className={'auth__form--register-wrapper'}>
                <div className={'auth__form--register-cell'}>
                    <div className={'auth__form--register-title'}>
                        <span>
                            {type ? 'Нет аккаунта?' : 'Воспользоваться'}
                        </span>
                    </div>
                    &nbsp;

                    <div className={'auth__form--register-link'}>
                        <Link to={type ? '/sign_up' : '/sign_in'}>
                            <div className={'auth__form--register-heading'}>
                               <span>
                                {type ? 'Зарегистрироваться' : 'аккаунтом'}
                            </span>
                            </div>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AuthForm;