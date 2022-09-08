import {Link} from 'react-router-dom';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';
import useOpen from '../../../hooks/open-hook';
import Button from '../../presentation/ui/button/Button';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';


const Preview: React.FC = memo(() => {
    const context = useContext(Context);
    const {faqPopupOpen, setFaqPopupOpen} = useOpen();
    const {token} = useAppSelector(state => state.auth);
    
    const faqPopup = <ValuePopup onClose={() => setFaqPopupOpen(prev => !prev)}>
        {context?.markupService.faqPopupHeadingTemplate()['faq']} <span className={'value-popup__content--data'}>{context?.markupService.faqPopupHeadingTemplate()['data']}</span>
    </ValuePopup>
    
    return (
        <>
            <div className={'auth-view'}>
                <div className={'auth-view__container'}>
                    <section className={'preview'}>
                        <div className={'preview__header'}>
                            <div className={'preview__logo'}>
                                <img 
                                    style={{width: '1em'}} 
                                    src={'/icons/pie-chart.svg'} 
                                    alt={context?.markupService.svgHeadingTemplate()['pie-chart']}
                                />
                            </div>
                            <div className={'preview__title'}>
                                <h1>{context?.markupService.previewHeadingTemplate()['title']}</h1>
                            </div>
                            <div className={'preview__faq'}>
                                <Button 
                                    disabled={undefined}
                                    className={'btn btn__faq'}
                                    onClick={{preview: () => setFaqPopupOpen(prev => !prev)}['preview']}
                                >
                                    <span>{context?.markupService.previewHeadingTemplate()['faq']}</span>
                                </Button>
                            </div>
                        </div>


                        <div className={'preview__slogan'}>
                            <h2 className={'preview__heading'}>
                            <span className={'preview__greeting'}>
                                {context?.markupService.previewHeadingTemplate()['greeting']}
                            </span>
                                <span className={'preview__action'}>
                                {context?.markupService.previewHeadingTemplate()['action']}
                            </span>
                            </h2>
                        </div>
                        <div className={'preview__btn-box'}>
                            <Link to={!token ? '/sign-in' : '/features'}>
                                <Button className={'btn btn__preview'} disabled={undefined} onClick={() => false}>
                                    <span>{context?.markupService.previewHeadingTemplate()[!token ? 'auth' : 'go']}</span>
                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>

            {faqPopupOpen && faqPopup}
        </>
    );
});


export default Preview;