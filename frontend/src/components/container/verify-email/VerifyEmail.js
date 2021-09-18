import React from 'react';
import Auth from '../../presentation/auth/Auth';


const VerifyEmail = () => {
    return(
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={'verify'}>
                    <div className={'verify'}>
                        <div className={'verify__container'}>
                            <div className={'verify__header'}>
                                <span>Подтвердите ваш электронный адрес.</span>
                            </div>
                            <div className={'verify__paragraph'}>
                                <p>Проверьте ваш почтовый ящик, и <br/> подтвердите свой адрес электронной почты.</p>
                            </div>

                            <div className={'verify__comment'}>
                                <span>Если вы не получили письмо:</span>
                            </div>
                        </div>
                    </div>
                </Auth>
            </div>
        </div>
    );
};


export default VerifyEmail;