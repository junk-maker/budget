import React from 'react';
import Auth from '../../presentation/auth/Auth';
import AuthView from '../../presentation/auth-view/AuthView';



const RecoverPassword = () => {
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
            <Auth type={'recover-password'} schema={recoverSchema}/>
        </AuthView>
    );
};



export default RecoverPassword;