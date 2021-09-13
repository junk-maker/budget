import React from 'react';
import Auth from '../auth/Auth';
import PropTypes from 'prop-types';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const RecoverPassword = props => {
    const {language} = props;
    const recoverSchema = new DataSchemasService();

    return(
        <AuthView>
            <Auth
                language={language}
                type={'recover-password'}
                schema={recoverSchema.recoverSchema()}/>
        </AuthView>
    );
};


RecoverPassword.propTypes = {
    language: PropTypes.string,
};


export default RecoverPassword;