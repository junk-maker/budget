import React from 'react';
import Auth from '../auth/Auth';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemas Service';


const SignUp = () => {
    const registerSchema = new DataSchemasService()
    return(
        <AuthView>
            <Auth type={'sign-up'} schema={registerSchema.registerSchema()}/>
        </AuthView>
    );
};


export default SignUp;