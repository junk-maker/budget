import {memo} from 'react';
import Auth from '../auth/Auth';
import {ContextData} from '../../../context/Context';

const SignUp = memo((): JSX.Element => {
    const {dataSchemasService} = ContextData();

    return (
        <Auth
            type={'sign-up'}
            schema={dataSchemasService.registerSchema()}
        />
    );
});

export default SignUp;