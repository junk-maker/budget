import Auth from '../auth/Auth';
import {useContext} from 'react';
import Context from '../../../context/Context';


const SignIn = () => {
    const context = useContext(Context);
    
    return (
        <Auth
            token={undefined}
            children={null}
            type={'sign-in'}
            resetToken={undefined}
            schema={{}}
            // schema={context?.dataSchemasService.loginSchema()}
        />
    );
};


export default SignIn;