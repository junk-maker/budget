import Auth from '../auth/Auth';
import {useParams} from 'react-router-dom';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';

const PasswordReset = memo(() => {
    const params = useParams();
    const resetToken = params?.resetToken;
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'password-reset'}
            resetToken={resetToken}
            schema={dataSchemasService.passwordResetSchema()}
        />
    );
});

export default PasswordReset;