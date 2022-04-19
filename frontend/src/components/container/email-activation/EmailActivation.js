import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {useEffect, useContext} from 'react';
import {fetchEmailActivation} from '../../../redux/actions/emailActivationActions';


const EmailActivation = ({match}) => {
    const params = useParams();
    const dispatch = useDispatch();
    const {appService} = useContext(Context);

    useEffect(() => {
        dispatch(fetchEmailActivation(params.token));
    },[dispatch, params.token]);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={'email-activation'}>
                    <div className={'verify'}>
                        <div className={'verify__container'}>
                            <div className={'verify__paragraph'}>
                                <p>
                                    {
                                        appService.checkLanguage() ?
                                            'Вы успешно активированы.' : 'You have been successfully activated.'
                                    }
                                    <br/>
                                    {
                                        appService.checkLanguage() ?
                                            'Вы можете войти сейчас!' : 'You can login now!'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </Auth>
            </div>
        </div>
    );
};


export default EmailActivation;