import {useContext} from 'react';
import Context from '../../../context/Context';

const NotFound = () => {
    const context = useContext(Context);

    return (
        <section className={'not-found'}>
            <div className={'not-found__container'}>
                <h2 className={'not-found__title'}>
                    {context?.markupService.notFoundHeadingTemplate()['title']}
                </h2>
                <h1>404</h1>
                <p className={'not-found__subtitle'}>
                    {context?.markupService.notFoundHeadingTemplate()['subtitle']}
                </p>
            </div>
        </section>
    );
};

export default NotFound;