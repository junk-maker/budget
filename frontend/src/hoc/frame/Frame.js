import React from 'react';
import PropTypes from 'prop-types';


const Frame = props => <div className={props.className}>{props.children}</div>;


Frame.propTypes = {
    children: PropTypes.object,
    className: PropTypes.string
};


export default Frame;