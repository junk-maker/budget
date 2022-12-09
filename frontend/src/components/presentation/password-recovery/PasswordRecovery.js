import Auth from '../auth/Auth';
import React, {memo, useContext} from 'react';
import {ContextData} from '../../../context/Context';

const PasswordRecovery = memo(() => {
    const {dataSchemasService} = ContextData();

    return (
        <Auth
            type={'password-recovery'}
            schema={dataSchemasService.recoverySchema()}
        />
    );
});

export default PasswordRecovery;