import React from 'react';
import Auth from '../../presentation/auth/Auth';
import AuthView from '../../presentation/auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';



const RecoverPassword = () => {
    const recoverSchema = new DataSchemasService();
    return(
        <AuthView>
            <Auth type={'recover-password'} schema={recoverSchema.recoverSchema()}/>
        </AuthView>
    );
};



export default RecoverPassword;