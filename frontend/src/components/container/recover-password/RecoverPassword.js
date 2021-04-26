import React from 'react';
import Auth from '../../presentation/auth/Auth';
import AppService from '../../../services/appService';



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
        <Auth service={app._service} schema={recoverSchema}/>
    );
};



export default RecoverPassword;