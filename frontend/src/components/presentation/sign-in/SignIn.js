import React from 'react';
import Auth from '../auth/Auth';
import AuthView from '../auth-view/AuthView';


const SignIn = () => {
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
            <Auth type={'sign-in'} schema={loginSchema}/>
        </AuthView>
    );
};


export default SignIn;