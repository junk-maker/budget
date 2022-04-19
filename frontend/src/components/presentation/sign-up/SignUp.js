import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignUp = () => {
    const {dataSchemesService} = useContext(Context);

    return (
        <Auth
            type={'sign-up'}
            schema={dataSchemesService.registerScheme()}
        />
    );
};


export default SignUp;