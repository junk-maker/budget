import Auth from '../auth/Auth';
import {useParams} from 'react-router-dom';
import React, {memo, useContext} from 'react';
import {ContextData} from '../../../context/Context';

const PasswordReset = memo(() => {
    const params = useParams();
    const resetToken = params?.resetToken;
    const {dataSchemasService} = ContextData();

    return (
        <Auth
            type={'password-reset'}
            resetToken={resetToken}
            schema={dataSchemasService.passwordResetSchema()}
        />
    );
});

export default PasswordReset;