import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {useEffect, useContext} from 'react';
import {fetchEmailActivation} from '../../../redux/actions/emailActivationActions';


const EmailActivation = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {markupService} = useContext(Context);

    useEffect(() => dispatch(fetchEmailActivation(params.token)),[dispatch, params.token]);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={'email-activation'}>
                    <div className={'email-activation'}>
                        <div className={'email-activation__container'}>
                            <div className={'email-activation__title'}>
                                <p>
                                    {markupService.emailActivationHeadingTemplate()['success']}
                                    <br/>
                                    {markupService.emailActivationHeadingTemplate()['call']}
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