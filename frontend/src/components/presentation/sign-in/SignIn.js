import React from 'react';
import Auth from '../auth/Auth';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const SignIn = () => {
    const loginSchema = new DataSchemasService();
    return(
        <AuthView>
            <Auth type={'sign-in'} schema={loginSchema.loginSchema()}/>
        </AuthView>
    );
};


export default SignIn;