import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const SignUp = () => {
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'sign-up'}
            schema={dataSchemasService.registerSchema()}
        />
    );
};


export default SignUp;