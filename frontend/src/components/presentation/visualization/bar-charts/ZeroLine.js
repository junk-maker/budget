import React from 'react';
import PropTypes from 'prop-types';


const ZeroLine = props => {
    const {height} = props;
    return(
        <line x1={0} y1={0} x2={0} y2={height + 5} stroke={'#203d4a'} strokeWidth={1.5}/>
    );
};


ZeroLine.propTypes = {
    height: PropTypes.number
};


export default ZeroLine;