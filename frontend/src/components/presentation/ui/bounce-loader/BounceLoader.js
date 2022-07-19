import React from 'react';
import PropTypes from 'prop-types';


const BounceLoader = ({className}) => {
    return (
        <div className={`bounce ${className}`}>
            <ul className={'bounce__container'}>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
            </ul>
        </div>
    );
};


BounceLoader.propTypes = {
    className: PropTypes.string,
};


export default BounceLoader;