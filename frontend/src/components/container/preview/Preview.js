import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';
import useOpen from '../../../hooks/open-hook';
import Button from '../../presentation/ui/button/Button';
import ValuePopup from '../../presentation/ui/popup/ValuePopup';

const Preview = memo(() => {
    const {markupService} = useContext(Context);
    const {token} = useSelector(state => state.auth);
    const {faqPopupOpen, setFaqPopupOpen} = useOpen();
    
    const faqPopup = <ValuePopup onClose={() => setFaqPopupOpen(prev => !prev)}>
        {markupService.faqPopupHeadingTemplate()['faq']} <span className={'value-popup__content--data'}>{markupService.faqPopupHeadingTemplate()['data']}</span>
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
                                    alt={markupService.svgHeadingTemplate()['pie-chart']}
                                />
                            </div>
                            <div className={'preview__title'}>
                                <h1>{markupService.previewHeadingTemplate()['title']}</h1>
                            </div>
                            <div className={'preview__faq'}>
                                <Button 
                                    className={'btn btn__faq'}
                                    onClick={{preview: () => setFaqPopupOpen(prev => !prev)}['preview']}
                                >
                                    <span>{markupService.previewHeadingTemplate()['faq']}</span>
                                </Button>
                            </div>
                        </div>


                        <div className={'preview__slogan'}>
                            <h2 className={'preview__heading'}>
                            <span className={'preview__greeting'}>
                                {markupService.previewHeadingTemplate()['greeting']}
                            </span>
                                <span className={'preview__action'}>
                                {markupService.previewHeadingTemplate()['action']}
                            </span>
                            </h2>
                        </div>
                        <div className={'preview__btn-box'}>
                            <Link to={!token ? '/sign-in' : '/features'}>
                                <Button className={'btn btn__preview'}>
                                    <span>{markupService.previewHeadingTemplate()[!token ? 'auth' : 'go']}</span>
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