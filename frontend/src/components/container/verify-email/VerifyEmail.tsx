import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {useEffect, useContext} from 'react';
import {fetchVerify} from '../../../redux/actions/verifyEmailActions';


const VerifyEmail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const contex = useContext(Context);
  
    // useEffect(() => dispatch(fetchVerify(params.token)),[dispatch, params.token]);

    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth 
                    resetToken={undefined}
                    schema={{}}
                    type={'verify-email'} 
                    token={params.token}
                >
                    <section className={'verify-email'}>
                        <div className={'verify-email__container'}>
                            <div className={'verify-email__title'}>
                                <p>
                                    {contex?.markupService.verifyEmailHeadingTemplate()['check']}
                                    <br/>
                                    {contex?.markupService.verifyEmailHeadingTemplate()['verify']}
                                </p>
                            </div>

                            <div className={'verify-email__helper'}>
                                <span>{contex?.markupService.verifyEmailHeadingTemplate()['helper']}</span>
                            </div>
                        </div>
                    </section>
                </Auth>
            </div>
        </div>
    );
};


export default VerifyEmail;