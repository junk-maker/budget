import {memo} from 'react';
import Auth from '../auth/Auth';
import {ContextData} from '../../../context/Context';

const SignUp = memo((): JSX.Element => {
    const {dataSchemesService} = ContextData();

    return (
        <Auth
            type={'sign-up'}
            schema={dataSchemesService.registerSchema()}
        />
    );
});

export default SignUp;