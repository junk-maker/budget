import React from 'react';
import AuthPattern from '../../patterns/AuthPattern/AuthPattern';
import AppService from '../../services/appService';


const SignIn = () => {
    const app = new AppService();
    const loginSchema = {
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
                minLength: 6,
                required: true
            },
            className: 'input',
            error: 'Заполните поле'
        }
    };
    return(
        <AuthPattern type={app._type} schema={loginSchema}/>
    );
};


export default SignIn;