import React from 'react';
import AuthPattern from '../../patterns/AuthPattern/AuthPattern';
import AppService from '../../services/appService';

const SignUp = () => {
    const app = new AppService();
    const registerSchema = {
        name: {
            value: '',
            valid: true,
            label: 'Имя',
            touched: false,
            type: 'name',
            validation: {
                minLength: 4,
                required: true
            },
            className: 'input',
            error: 'Заполните поле'
        },
        email: {
            value: '',
            valid: true,
            type: 'email',
            label: 'Почта',
            touched: false,
            validation: {
                email: true,
                required: true
            },
            className: 'input',
            error: 'Заполните поле'
        },
        password: {
            value: '',
            valid: true,
            touched: false,
            label: 'Пароль',
            type: 'password',
            validation: {
                // password: true,
                minLength: 6,
                required: true
            },
            className: 'input',
            error: 'Заполните поле'
        },
        confirmPassword: {
            value: '',
            valid: true,
            touched: false,
            type: 'password',
            validation: {
                // password: true,
                minLength: 6,
                required: true
            },
            className: 'input',
            error: 'Заполните поле',
            label: 'Подтвердить пароль',
        }
    };
    return(
        <AuthPattern type={!app._type} schema={registerSchema}/>
    );
};


export default SignUp;