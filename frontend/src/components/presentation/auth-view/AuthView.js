import React from 'react';
import PropTypes from 'prop-types';


const AuthView = props => {
    const {children} = props;
    return (
        <div className={'auth-view'}>
            <div className={'auth-view__container'}>
                {children}
            </div>
        </div>
    );
};


AuthView.propTypes = {
    children: PropTypes.object
};


export default AuthView;