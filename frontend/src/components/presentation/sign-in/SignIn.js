import React from 'react';
import Auth from '../auth/Auth';
import PropTypes from 'prop-types';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const SignIn = props => {
    const {language} = props;
    const dataSchemasService = new DataSchemasService();

    return(
        <AuthView>
            <Auth
                type={'sign-in'}
                language={language}
                schema={dataSchemasService.loginSchema()}/>
        </AuthView>
    );
};


SignIn.propTypes = {
    language: PropTypes.string,
};


export default SignIn;