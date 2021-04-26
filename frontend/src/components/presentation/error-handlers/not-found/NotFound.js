import React from 'react';


const NotFound = () => {
    return (
        <div className={'not-found'}>
            <div className={'not-found__container'}>
                <h2 className={'not-found__heading'}>Что-то пошло не так!</h2>
                <h1>404</h1>
                <p className={'not-found__text'}>Страница не найдена</p>
                {/*<Button onClick={returnHandler} className={ui.errorButton}>*/}
                {/*    <span>На главную</span>*/}
                {/*</Button>*/}
            </div>
        </div>
    );
};


export default NotFound;