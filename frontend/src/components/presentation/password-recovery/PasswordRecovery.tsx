import Auth from '../auth/Auth';
import {useContext} from 'react';
import Context from '../../../context/Context';


const PasswordRecovery = () => {
    const conntext = useContext(Context);

    return (
        <Auth
            children={null}
            token={undefined}
            schema={{}}
            resetToken={undefined}
            type={'password-recovery'}
            // schema={dataSchemasService.recoverySchema()}
        />
    );
};


export default PasswordRecovery;