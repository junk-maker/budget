import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React, {useContext} from 'react';
import Context from '../../../context/Context';
import Button from '../../presentation/ui/button/Button';


const Preview = () => {
    const authActions  = useSelector(state => state.getAuth);
    const {markupService} = useContext(Context);
    const {token} = authActions;
    
    return (
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
    );
};


export default Preview;