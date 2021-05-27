import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppService from '../../../../services/appService';
import Input from '../../../presentation/ui/input/Input';
import Button from '../../../presentation/ui/button/Button';
import {ValidationService} from '../../../../services/validationService';
import {Link, useHistory} from 'react-router-dom';
import {fetchLogin, fetchRegister} from '../../../../redux/actions/authAction';
import ErrorPopup from '../../popup/ErrorPopup';
import BtnLoader from '../../../presentation/ui/btn-loader/BtnLoader';


const AuthForm = props => {
    const [modalWindowOpen, setModalWindowOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const budgetActions  = useSelector(state => state.getAuth);
    const [count, setCount] = useState(30);
    const{auth, schema, service, children} = props;
    const [form, setForm] = useState(schema);
    const {error, loading} = budgetActions;
    const validation = ValidationService;
    const dispatch = useDispatch();
    const app = new AppService();
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            history.push('/features');
        }
    }, [history]);


    const submitHandler = event => {
        event.preventDefault();
    };

    const onChangeHandler = (e, name, form, callback) => {
        validation.changeHandler(e, name, form, callback);
    };

    const loginHandler = async () => {
        dispatch(
            fetchLogin(
                history,
                form.email.value,
                setModalWindowOpen,
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
                setModalWindowOpen,
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
                                    validation.isInvalid(control.valid, control.touched, !!control.validation)
                                        ? 'input error' : 'input success') : 'input error'
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

    useEffect(() => {
        // console.clear();
        if (count === 0) return;
        let interval = setInterval( () => setCount(count - 1), 1000);
        return () => clearInterval(interval);
    });

    const valueRender = () => app.valueRender(form, createInput);

    return(
        <>
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
                                auth === true ? valueRender() :  auth === false ?
                                    valueRender() : service ? valueRender() : children
                            }
                            <div className={'auth__form--btn-cell'}>
                                {
                                    auth === true || auth === false || service ?
                                        <Button
                                            disabled={!error ? (!loading ? !isFormValid : true) : true}
                                            className={
                                                !error ?
                                                (!loading ? !isFormValid ? 'auth__btn-off' : 'auth__btn-on' :
                                                    'auth__btn-off') : 'auth__btn-off'}
                                            onClick={
                                                auth === true  ? loginHandler : auth === false ?
                                                    registerHandler : service ?  null : null
                                            }
                                        >
                                            <div className={'auth__form--btn-heading'}>
                                    <span>
                                        {
                                            !loading ? (auth === true ? 'Войти' : auth === false ?
                                                'Создать' : service ? 'Сбросить' : null) : <BtnLoader/>
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
                                <Link to={!service ? '/help' : '/'}>
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

            <ErrorPopup
                auth={auth}
                error={error}
                schema={schema}
                setForm={setForm}
                setIsFormValid={setIsFormValid}
                modalWindowOpen={modalWindowOpen}
                setModalWindowOpen={setModalWindowOpen}
            >
                <div className={'error-popup__error'}>
                        <span>
                            {
                                auth ? <div>Неверные данные: <br/> электронная почта или пароль</div>
                                    : 'Адрес электронной почты уже зарегистрирован'
                            }
                        </span>
                </div>
            </ErrorPopup>
        </>
    );
};


AuthForm.propTypes = {
    auth: PropTypes.bool,
    service: PropTypes.bool,
    schema: PropTypes.object,
    children: PropTypes.object
};


export default AuthForm;