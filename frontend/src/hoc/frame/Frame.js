import React from 'react';
import PropTypes from 'prop-types';


const Frame = ({children, className}) => <div className={className}>{children}</div>;


Frame.propTypes = {
    children: PropTypes.object,
    className: PropTypes.string
};


export default Frame;