import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';
import Authorization from '../../container/form/authorization/Authorization';


const Auth = props => {
    const {markupService} = useContext(Context);
    const {type, token, schema, children, resetToken} = props;

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <div className={'auth'}>
                    <div className={'auth__header'}>
                        <div className={type === 'sign-up' ? 'auth__header' : 'auth__header--height'}>
                            <div className={'auth__title'}>
                                <div className={'auth__header-wrapper'}>
                                    <div className={'auth__header-cell'}>
                                        <h1 className={'auth__header-heading'}>
                                            {markupService.previewHeadingTemplate()['title']}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Authorization type={type} token={token} schema={schema} children={children} resetToken={resetToken}/>
                    
                    <div className={'auth__footer'}>
                        <div/>
                    </div>
                </div>
            </div>
        </div>
    );
};


Auth.propTypes = {
    type: PropTypes.string,
    token: PropTypes.string,
    schema: PropTypes.object,
    children: PropTypes.object,
    resetToken: PropTypes.string,
};


export default Auth;