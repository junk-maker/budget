import React from 'react';
import Auth from '../auth/Auth';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const ResetPassword = ({match}) => {
    const resetPasswordSchema = new DataSchemasService();
    return(
        <AuthView>
            <Auth type={'reset-password'} resetToken={match.params.resetToken} schema={resetPasswordSchema.resetPasswordSchema()}/>
        </AuthView>
    );
};


export default ResetPassword;