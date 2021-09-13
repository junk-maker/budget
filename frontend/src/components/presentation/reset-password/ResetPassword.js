import React from 'react';
import Auth from '../auth/Auth';
import PropTypes from 'prop-types';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const ResetPassword = props => {
    const {match, language} = props;
    const resetPasswordSchema = new DataSchemasService();

    return(
        <AuthView>
            <Auth
                language={language}
                type={'reset-password'}
                resetToken={match.params.resetToken}
                schema={resetPasswordSchema.resetPasswordSchema()}/>
        </AuthView>
    );
};


ResetPassword.propTypes = {
    match: PropTypes.object,
    language: PropTypes.string,
};


export default ResetPassword;