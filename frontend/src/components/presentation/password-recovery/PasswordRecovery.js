import Auth from '../auth/Auth';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';

const PasswordRecovery = memo(() => {
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'password-recovery'}
            schema={dataSchemasService.recoverySchema()}
        />
    );
});

export default PasswordRecovery;