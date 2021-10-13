import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const RecoverPassword = () => {
    const {dataSchemasService} = useContext(Context);

    return(
        <Auth
            type={'recover-password'}
            schema={dataSchemasService.recoverSchema()}
        />
    );
};


export default RecoverPassword;