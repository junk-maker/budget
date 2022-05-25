import React from 'react';
import PropTypes from 'prop-types';


const ZeroLine = props => (<line x1={0} y1={0} x2={0} y2={props.height + 5} stroke={'#203d4a'} strokeWidth={1.5}/>);


ZeroLine.propTypes = {
    height: PropTypes.number
};


export default ZeroLine;