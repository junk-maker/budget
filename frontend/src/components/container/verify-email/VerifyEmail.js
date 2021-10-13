import {useDispatch} from 'react-redux';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {useEffect, useContext} from 'react';
import {fetchVerify} from '../../../redux/actions/verifyEmailActions';


const VerifyEmail = ({match}) => {
    const dispatch = useDispatch();
    const {appService} = useContext(Context);

    useEffect(() => {
        dispatch(fetchVerify(match.params.token));
    },[dispatch, match.params.token]);

    return(
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={'verify-email'} token={match.params.token}>
                    <div className={'verify'}>
                        <div className={'verify__container'}>
                            <div className={'verify__paragraph'}>
                                <p>
                                    {
                                        appService.checkLanguage() ?
                                            'Проверьте ваш почтовый ящик, и' : 'Check your inbox, and'
                                    }
                                    <br/>
                                    {
                                        appService.checkLanguage() ?
                                            'подтвердите свой адрес электронной почты.' : 'confirm your email address'
                                    }
                                </p>
                            </div>

                            <div className={'verify__comment'}>
                                <span>
                                    {
                                        appService.checkLanguage() ?
                                            'Если вы не получили письмо:' : 'If you have not received the letter:'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </Auth>
            </div>
        </div>
    );
};


export default VerifyEmail;