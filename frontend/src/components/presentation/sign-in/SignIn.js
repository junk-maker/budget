import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignIn = () => {
    const {dataSchemesService} = useContext(Context);
    
    return (
        <Auth
            type={'sign-in'}
            schema={dataSchemesService.loginScheme()}
        />
    );
};


export default SignIn;