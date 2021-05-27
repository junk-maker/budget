import React from 'react';
import Auth from '../auth/Auth';
import AuthView from '../auth-view/AuthView';
import AppService from '../../../services/appService';


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
            error: 'Обязательно'
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
            error: 'Обязательно'
        }
    };
    return(
        <AuthView>
            <Auth auth={app._auth} schema={loginSchema}/>
        </AuthView>
    );
};


export default SignIn;