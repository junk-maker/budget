import React from 'react';
import Auth from '../auth/Auth';
import PropTypes from 'prop-types';
import AuthView from '../auth-view/AuthView';
import DataSchemasService from '../../../services/dataSchemasService';


const SignUp = props => {
    const {language} = props;
    const registerSchema = new DataSchemasService();

    return(
        <AuthView>
            <Auth
                type={'sign-up'}
                language={language}
                schema={registerSchema.registerSchema()}/>
        </AuthView>
    );
};


SignUp.propTypes = {
    language: PropTypes.string,
};


export default SignUp;