import {memo} from 'react';
import Auth from '../auth/Auth';
import {ContextData} from '../../../context/Context';

const SignIn = memo((): JSX.Element => {
    const {dataSchemesService} = ContextData();
    
    return (
        <Auth
            type={'sign-in'}
            schema={dataSchemesService.loginSchema()}
        />
    );
});

export default SignIn;