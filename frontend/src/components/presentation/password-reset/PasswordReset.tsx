import Auth from '../auth/Auth';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';


const PasswordReset = () => {
    const params = useParams();
    const context = useContext(Context);

    return (
        <Auth
            children={null}
            token={undefined}
            type={'password-reset'}
            resetToken={params.resetToken}
            schema={{}}
            // schema={context?.dataSchemasService.passwordResetSchema()}
        />
    );
};


export default PasswordReset;