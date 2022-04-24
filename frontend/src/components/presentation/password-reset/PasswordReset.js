import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';


const PasswordReset = () => {
    const params = useParams();
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'password-reset'}
            resetToken={params.resetToken}
            schema={dataSchemasService.passwordResetSchema()}
        />
    );
};


export default PasswordReset;