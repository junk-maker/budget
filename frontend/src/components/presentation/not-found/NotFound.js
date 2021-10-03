import React, {useContext} from 'react';
import Context from '../../../context/Context';


const NotFound = () => {
    const {appService} = useContext(Context);
    return (
        <div className={'not-found'}>
            <div className={'not-found__container'}>
                <h2 className={'not-found__heading'}>
                    {appService.checkLanguage() ? 'Что-то пошло не так!' : 'Something went wrong!'}
                </h2>
                <h1>404</h1>
                <p className={'not-found__text'}>
                    {appService.checkLanguage() ? 'Страница не найдена' : 'Page not found'}
                </p>
            </div>
        </div>
    );
};


export default NotFound;