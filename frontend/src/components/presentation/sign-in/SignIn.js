import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignIn = () => {
    const {dataSchemasService} = useContext(Context);
    
    return (
        <Auth
            type={'sign-in'}
            schema={dataSchemasService.loginSchema()}
        />
    );
};


export default SignIn;