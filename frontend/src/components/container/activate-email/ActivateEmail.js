import {useDispatch} from 'react-redux';
import Context from '../../../context/Context';
import Auth from '../../presentation/auth/Auth';
import React, {useEffect, useContext} from 'react';
import {fetchActivate} from '../../../redux/actions/activateEmailActions';


const ActivateEmail = ({match}) => {
    const dispatch = useDispatch();
    const {appService} = useContext(Context);

    useEffect(() => {
        dispatch(fetchActivate(match.params.token));
    },[dispatch, match.params.token]);

    return(
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                <Auth type={'activate-email'}>
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

export default ActivateEmail;