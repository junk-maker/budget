import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const RecoverPassword = () => {
    const {appService, markupService, dataSchemasService} = useContext(Context);

    return(
        <Auth
            appService={appService}
            type={'recover-password'}
            markupService={markupService}
            schema={dataSchemasService.recoverSchema()}
        />
    );
};


export default RecoverPassword;