import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignIn = () => {
    const {appService, markupService, dataSchemasService} = useContext(Context);
    return(
        <Auth
            type={'sign-in'}
            appService={appService}
            markupService={markupService}
            schema={dataSchemasService.loginSchema()}
        />
    );
};


export default SignIn;