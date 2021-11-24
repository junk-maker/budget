import Auth from '../auth/Auth';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';


const ResetPassword = ({match}) => {
    const params = useParams();
    const {dataSchemasService} = useContext(Context);

    return(
        <Auth
            type={'reset-password'}
            resetToken={params.resetToken}
            schema={dataSchemasService.resetPasswordSchema()}
        />
    );
};


ResetPassword.propTypes = {
    match: PropTypes.object,
};


export default ResetPassword;