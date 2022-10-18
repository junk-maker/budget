import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {memo, useMemo, useEffect, useContext} from 'react';
import {actionToEmailActivation} from '../../../redux/slice/emailActivationSlice';

const EmailActivation = memo(() => {
    const params = useParams();
    const token = params?.token;
    const dispatch = useDispatch();
    const type = 'email-activation';
    const {markupService} = useContext(Context);

    const emailActivationData = useMemo(() => {return {
        type,
        token,
    }}, [type, token]);

    useEffect(() => {
        dispatch(actionToEmailActivation(emailActivationData));
    },[dispatch, emailActivationData]);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={type}>
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
});

export default EmailActivation;