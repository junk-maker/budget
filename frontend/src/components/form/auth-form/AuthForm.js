import React from 'react';
import Button from '../../ui/button/Button';
import {Link} from 'react-router-dom';
import Input from '../../ui/input/Input';
import AppService from '../../../services/appService';


const AuthForm = props => {
    const{type ,schema} = props;
    const app = new AppService();

    const submitHandler = event => {
        event.preventDefault();
    };

    const loginHandler = async () => {};

    const registerHandler = async () => {};


    const createInput = (...args) => {
        const [idx, input] = args;
        let htmlFor = `${input.type}-${Math.random()}`;
        return (
            <div className={'auth__form--input'} key={idx}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span>{input.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            <Input
                                type={input.type}
                                className={input.className}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const inputRender = () => app.inputLoop(schema, createInput);

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
                        {
                            inputRender()
                        }
                        <div className={'auth__form--btn-cell'}>
                            {/*<Button*/}
                            {/*    //disabled={!isFormValid}*/}
                            {/*    //className={!isFormValid ? 'auth__btn-off' : 'auth__btn-on'}*/}
                            {/*    // onClick={toggleAuth ? registerHandler : loginHandler}*/}
                            {/*>*/}
                            <Button
                                // disabled={!isFormValid}
                                className={'auth__btn-off'}
                                onClick={type ? registerHandler : loginHandler}
                            >
                                <div className={'auth__form--btn-heading'}>
                                            <span>
                                                {/*{!loading ? helper ?*/}
                                                {/*    'Создать' : 'Войти' : <BtnLoader/>}*/}
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
            <div className={'auth__form--register-wrapper'}
                // onClick={toggleRegisterHandler}
            >
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