import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignUp = () => {
    const {appService, markupService, dataSchemasService} = useContext(Context);

    return(
        <Auth
            type={'sign-up'}
            appService={appService}
            markupService={markupService}
            schema={dataSchemasService.registerSchema()}
        />
    );
};


export default SignUp;