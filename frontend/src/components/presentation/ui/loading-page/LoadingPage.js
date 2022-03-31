import React from 'react';
import BounceLoader from '../bounce-loader/BounceLoader';


const LoadingPage = () => {
    return (
        <div className={'loading-page'}>
            <div className={'loading-page__container'}>
                <BounceLoader/>
            </div>
        </div>
    );
};


export default LoadingPage;