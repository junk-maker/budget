import {memo} from 'react';
import Auth from '../auth/Auth';
import {ContextData} from '../../../context/Context';

const SignIn = memo((): JSX.Element => {
    const {dataSchemasService} = ContextData();
    
    return (
        <Auth
            type={'sign-in'}
            schema={dataSchemasService.loginSchema()}
        />
    );
});

export default SignIn;