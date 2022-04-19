import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const PasswordRecovery = () => {
    const {dataSchemesService} = useContext(Context);

    return (
        <Auth
            type={'password-recovery'}
            schema={dataSchemesService.recoveryScheme()}
        />
    );
};


export default PasswordRecovery;