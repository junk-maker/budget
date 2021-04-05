import React from 'react';
import AuthForm from '../../components/form/auth-form/AuthForm';
//import BtnLoader from '../../components/ui/btn-loader/BtnLoader';


const AuthPattern = props => {
    const{type ,schema} = props;

    return(
        <div className={'auth'}>
            <div className={'auth__header'}>
                <div className={type ? 'auth__header--auth' : 'auth__header--register'}>
                    <div className={'auth__title'}>
                        <div className={'auth__title--wrapper'}>
                            <div className={'auth__title--cell'}>
                                <h1 className={'auth__title--heading'}>Бюджет</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AuthForm type={type} schema={schema}/>

            <div className={'auth__footer'}>
                <div/>
            </div>
        </div>
    );
};


export default AuthPattern;