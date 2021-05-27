import React from 'react';
import Auth from '../../presentation/auth/Auth';
import AppService from '../../../services/appService';
import AuthView from '../../presentation/auth-view/AuthView';



const RecoverPassword = () => {
    const app = new AppService();
    const recoverSchema = {
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
        }
    };
    return(
        <AuthView>
            <Auth service={app._service} schema={recoverSchema}/>
        </AuthView>
    );
};



export default RecoverPassword;