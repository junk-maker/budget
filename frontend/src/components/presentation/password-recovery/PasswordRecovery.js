import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const PasswordRecovery = () => {
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'password-recovery'}
            schema={dataSchemasService.recoverySchema()}
        />
    );
};


export default PasswordRecovery;