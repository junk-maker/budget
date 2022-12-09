import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ContextData} from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {memo, useMemo, useEffect, useContext} from 'react';
import {actionToVerifyEmail} from '../../../redux/slice/verifyEmailSlice';

const VerifyEmail = memo(() => {
    const params = useParams();
    const token = params?.token;
    const type = 'verify-email';
    const dispatch = useDispatch();
    const {markupService} = ContextData();

    const verifyEmailData = useMemo(() => {return {
        type, 
        token,
    }}, [type, token]);
  
    useEffect(() => {
        dispatch(actionToVerifyEmail(verifyEmailData));
    },[dispatch, verifyEmailData]);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={type} token={token}>
                    <section className={'verify-email'}>
                        <div className={'verify-email__container'}>
                            <div className={'verify-email__title'}>
                                <p>
                                    {markupService.verifyEmailHeadingTemplate()['check']}
                                    <br/>
                                    {markupService.verifyEmailHeadingTemplate()['verify']}
                                </p>
                            </div>

                            <div className={'verify-email__helper'}>
                                <span>{markupService.verifyEmailHeadingTemplate()['helper']}</span>
                            </div>
                        </div>
                    </section>
                </Auth>
            </div>
        </div>
    );
});

export default VerifyEmail;