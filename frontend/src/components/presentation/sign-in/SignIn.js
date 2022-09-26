import Auth from '../auth/Auth';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';

const SignIn = memo(() => {
    const {dataSchemasService} = useContext(Context);
    
    return (
        <Auth
            type={'sign-in'}
            schema={dataSchemasService.loginSchema()}
        />
    );
});

export default SignIn;