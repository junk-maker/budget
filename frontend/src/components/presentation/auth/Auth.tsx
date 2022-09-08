import {useContext} from 'react';
import Button from '../ui/button/Button';
import {AuthProps} from '../../../types/types';
import Context from '../../../context/Context';
import useOpen from '../../../hooks/open-hook';
import ValuePopup from '../ui/popup/ValuePopup';
import Authorization from '../../container/form/authorization/Authorization';

const Auth = ({type, token, schema, children, resetToken}: AuthProps) => {
    const context = useContext(Context);
    const {faqPopupOpen, setFaqPopupOpen} = useOpen();

    const faqPopup = <ValuePopup onClose={() => setFaqPopupOpen(prev => !prev)}>
        {context?.markupService.faqPopupHeadingTemplate()['faq']} <span className={'value-popup__content--data'}>{context?.markupService.faqPopupHeadingTemplate()['data']}</span>
    </ValuePopup>
    
    return (
        <>
            <div className={'auth-view'}>
                <div className={'auth-view__container'}>
                    <div className={'auth'}>
                        <div className={'auth__header'}>
                            {type === 'sign-in' || type === 'sign-up' || type === 'password-recovery' ? <div className={type === 'sign-up' ? 'auth__header-faq--height' : 'auth__header-faq'}>
                                <Button 
                                    disabled={undefined}
                                    className={'btn btn__faq'}
                                    onClick={{auth: () => setFaqPopupOpen(prev => !prev)}['auth']}
                                >
                                    <span>{context?.markupService.previewHeadingTemplate()['faq']}</span>
                                </Button>
                            </div> : null}
                            <div className={type === 'sign-up' ? 'auth__header' : 'auth__header--height'}>
                                <div className={'auth__title'}>
                                    <div className={'auth__header-wrapper'}>
                                        <div className={'auth__header-cell'}>
                                            <h1 className={'auth__header-heading'}>
                                                {context?.markupService.previewHeadingTemplate()['title']}
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

            {faqPopupOpen && faqPopup}
        </> 
    );  
};

export default Auth;