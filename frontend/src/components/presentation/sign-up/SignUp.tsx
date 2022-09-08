import Auth from '../auth/Auth';
import {useContext} from 'react';
import Context from '../../../context/Context';


const SignUp = () => {
    const context = useContext(Context);

    return (
        <Auth
            token={undefined}
            children={null}
            type={'sign-up'}
            resetToken={undefined}
            schema={{}}
            // schema={context?.dataSchemasService.registerSchema()}
        />
    );
};


export default SignUp;