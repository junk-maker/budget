import PropTypes from 'prop-types';
import ErrorPopup from '../../popup/ErrorPopup';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../../presentation/ui/input/Input';
import AppService from '../../../../services/appService';
import Button from '../../../presentation/ui/button/Button';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';
import ValidationService from '../../../../services/validationService';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authAction';


const AuthForm = props => {
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const authActions  = useSelector(state => state.getAuth);
    const validationService = new ValidationService();
    const [count, setCount] = useState(30);
    const {type, schema, children} = props;
    const [form, setForm] = useState(schema);
    const {error, loading} = authActions;
    const appService = new AppService();
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
    };

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/features');
        }
    }, [history]);

    const loginHandler = async () => {
        dispatch(
            fetchLogin(
                history,
                form.email.value,
                setErrorPopupOpen,
                form.password.value
            )
        );
    };

    const registerHandler = async () => {
        await dispatch(
            fetchRegister(
                history,
                form.name.value,
                form.email.value,
                setErrorPopupOpen,
                form.password.value
            )
        );
    };

    const setStateHandler = schema => {
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

    const expression = !error ?
        (!loading ? !isFormValid ? 'auth__btn-off' : 'auth__btn-on' : 'auth__btn-off')
        : 'auth__btn-off';


    const createInput = (idx, name, control) => {
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
                                className={!error ? (!control.touched ? 'input' :
                                    validationService.isInvalid(control.valid, control.touched, !!control.validation)
                                        ? 'input error' : 'input success') : 'input error'
                                }
                                onChange={e => validationService.changeHandler(e, name, form, setStateHandler)}
                            />
                        </div>
                        {
                            validationService.isInvalid(control.valid, control.touched, !!control.validation)
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

    const markdown = <div className={'auth__form--register-wrapper'}>
        <div className={'auth__form--register-cell'}>
            <div className={'auth__form--register-title'}>
                        <span>
                            {appService.authToggle(type, {
                                in: 'Нет аккаунта',
                                up: 'Воспользоваться',
                                verify: null,
                                recover: null,
                            })}
                        </span>
            </div>
            &nbsp;
            <div className={'auth__form--register-link'}>
                <Link to={appService.authToggle(type, {
                    in: '/sign-up',
                    up: '/sign-in',
                    verify: '',
                    recover: '',
                })}>
                    <div className={'auth__form--register-heading'}>
                               <span>
                                    {appService.authToggle(type, {
                                        in: 'Зарегистрироваться',
                                        up: 'аккаунтом',
                                        verify: null,
                                        recover: null,
                                    })}
                            </span>
                    </div>
                </Link>
            </div>
        </div>
    </div>;

    useEffect(() => {
        // console.clear();
        // if (count === 0) return;
        // let interval = setInterval( () => setCount(prev => prev - 1), 1000);
        // return () => clearInterval(interval);
    });


    return(
        <>
            <div className={'auth__form'}>
                <div className={'auth__form--wrapper'}>
                    <div className={'auth__form--cell'}>
                        <div className={'auth__form--title'}>
                            <div className={'auth__form--heading'}>
                                    <span>
                                        {appService.authToggle(type, {
                                            in: 'Авторизация',
                                            up: 'Регистрация',
                                            verify: 'Подтвердить почту',
                                            recover: 'Сброс пароля',
                                        })}
                                    </span>
                            </div>
                        </div>
                        <form onClick={e => submitHandler(e)}
                            className={'auth__form--entry'}>
                            {appService.renderToggle(type, form, children, createInput)}
                            <div className={'auth__form--btn-cell'}>
                                <Button
                                    disabled={appService.authToggle(type, {
                                        in: !error ? (!loading ? !isFormValid : true) : true,
                                        up: !error ? (!loading ? !isFormValid : true) : true,
                                        verify: count !== 0,
                                        recover: !error ? (!loading ? !isFormValid : true) : true,
                                    })}
                                    className={appService.authToggle(type, {
                                        in: expression,
                                        up: expression,
                                        verify: count !== 0 ? 'auth__btn-off' : 'auth__btn-on',
                                        recover: expression,
                                    })}
                                    onClick={appService.authToggle(type, {
                                        in: loginHandler,
                                        up: registerHandler,
                                        verify: null,
                                        recover: null,
                                    })}>
                                    <div className={'auth__form--btn-heading'}>
                                    <span>
                                        {!loading ? appService.authToggle(type, {
                                            in: 'Войти',
                                            up: 'Создать',
                                            verify: count !== 0 ? count : 'Отправить повторно',
                                            recover: 'Сбросить',
                                        }) : <BtnLoader/>}
                                    </span>
                                    </div>
                                </Button>
                            </div>
                            <div className={'auth__form--help'}>
                                <Link to={appService.authToggle(type, {
                                    in: '/recover-password',
                                    up: '/recover-password',
                                    verify: '',
                                    recover: '/',
                                })}>
                                    <div className={'auth__form--help-heading'}>
                                    <span>
                                       {appService.authToggle(type, {
                                           in: 'Нужна помощь?',
                                           up: 'Нужна помощь?',
                                           verify: '',
                                           recover: 'На главную',
                                       })}
                                    </span>
                                    </div>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                {appService.authToggle(type, {
                    in: markdown,
                    up: markdown,
                    verify: null,
                    recover: null,
                })}
            </div>

            <ErrorPopup
                type={type}
                error={error}
                schema={schema}
                setForm={setForm}
                setIsFormValid={setIsFormValid}
                errorPopupOpen={errorPopupOpen}
                setErrorPopupOpen={setErrorPopupOpen}
            >
                <div className={'error-popup__error'}>
                    <span>
                        {appService.authToggle(type, {
                            in: <div>Неверные данные: <br/> электронная почта или пароль</div>,
                            up: 'Адрес электронной почты уже зарегистрирован',
                            verify: '',
                            recover: '',
                        })}
                    </span>
                </div>
            </ErrorPopup>
        </>
    );
};


AuthForm.propTypes = {
    type: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object
};


export default AuthForm;