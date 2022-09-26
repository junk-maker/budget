import Auth from '../auth/Auth';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';

const SignUp = memo(() => {
    const {dataSchemasService} = useContext(Context);

    return (
        <Auth
            type={'sign-up'}
            schema={dataSchemasService.registerSchema()}
        />
    );
});

export default SignUp;