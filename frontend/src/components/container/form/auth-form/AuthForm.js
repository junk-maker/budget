import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import AppService from '../../../../services/appService';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import {ValidationService} from '../../../../services/validationService';


const AuthForm = props => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [count, setCount] = useState(30);
    const{auth ,schema, service, children} = props;
    const [form, setForm] = useState(schema);
    const validation = ValidationService;
    const app = new AppService();


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
            if (!schema.hasOwnProperty('confirmPassword')) {
                return isFormValidLocal = schema[name].valid &&
                    isFormValidLocal && schema[name].value !== '';
            } else {
                return isFormValidLocal = schema[name].valid &&
                    isFormValidLocal && schema[name].value !== '' &&
                    schema['password'].value === schema['confirmPassword'].value;
            }
        });

        setForm(schema);
        setIsFormValid(isFormValidLocal);
    };

    const createInput = (...args) => {
        const [idx, name, control] = args;
        let htmlFor = `${control.type}-${Math.random()}`;
        return (
            <div className={'auth__form--input'} key={idx + name}>
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
                                    validation.isInvalid(control.valid, control.touched, !!control.validation)
                                        ? 'input error' : 'input success'
                                }
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

    const tick = () => setCount(count - 1);

    useEffect(() => {
        if (count === 0) return;
        const interval = setInterval( () => tick(), 1000);
        return () => clearInterval(interval);
    });

    const inputRender = () => app.objectIteration(form, createInput);

    return(
        <div className={'auth__form'}>
            <div className={'auth__form--wrapper'}>
                <div className={'auth__form--cell'}>
                    <div className={'auth__form--title'}>
                        <div className={'auth__form--heading'}>
                                    <span>
                                        {
                                            auth === true ? 'Авторизация' : auth === false ?
                                            'Регистрация': service ? 'Сброс пароля' : 'Подтвердить почту'
                                        }
                                    </span>
                        </div>
                    </div>
                    <form
                        onClick={submitHandler}
                        className={'auth__form--entry'}
                    >
                        {
                            auth === true ? inputRender() :  auth === false ?
                            inputRender() : service ? inputRender() : children
                        }
                        <div className={'auth__form--btn-cell'}>
                            {
                                auth === true || auth === false || service ?
                                    <Button
                                        disabled={!isFormValid}
                                        className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}
                                        onClick={auth ? registerHandler : loginHandler}
                                    >
                                        <div className={'auth__form--btn-heading'}>
                                    <span>
                                        {
                                            auth === true ? 'Войти' : auth === false ?
                                                'Создать' : service ? 'Сбросить' : null
                                        }
                                    </span>
                                        </div>
                                    </Button> :
                                    <Button
                                        disabled={count !== 0}
                                        className={count !== 0 ? 'auth__btn-off' :'auth__btn-on' }
                                        // onClick={auth ? registerHandler : loginHandler}
                                    >
                                        <div className={'auth__form--btn-heading'}>
                                            {
                                                count !== 0 ?
                                                    <span>{count}</span> :
                                                    <span>Отправить повторно</span>
                                            }
                                        </div>
                                    </Button>
                            }
                        </div>
                        <div className={'auth__form--help'}>
                            <Link to={!service ? '/help' : '/preview'}>
                                <div className={'auth__form--help-heading'}>
                                    <span>
                                       {
                                           auth === true || auth === false ?
                                               'Нужна помощь?' : service ? 'На главную' : null
                                       }
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            {
                auth === true || auth === false ? <div className={'auth__form--register-wrapper'}>
                    <div className={'auth__form--register-cell'}>
                        <div className={'auth__form--register-title'}>
                        <span>
                            {auth ? 'Нет аккаунта?' : 'Воспользоваться'}
                        </span>
                        </div>
                        &nbsp;

                        <div className={'auth__form--register-link'}>
                            <Link to={auth ? '/sign-up' : '/sign-in'}>
                                <div className={'auth__form--register-heading'}>
                               <span>
                                {auth ? 'Зарегистрироваться' : 'аккаунтом'}
                            </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div> : null
            }
        </div>
    );
};


AuthForm.propTypes = {
    auth: PropTypes.bool,
    service: PropTypes.bool,
    schema: PropTypes.object,
    children: PropTypes.object
};


export default AuthForm;