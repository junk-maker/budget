import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';


const PasswordReset = () => {
    const params = useParams();
    const {dataSchemesService} = useContext(Context);

    return (
        <Auth
            type={'password-reset'}
            resetToken={params.resetToken}
            schema={dataSchemesService.passwordResetScheme()}
        />
    );
};


export default PasswordReset;