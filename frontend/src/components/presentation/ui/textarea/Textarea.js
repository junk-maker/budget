import React from 'react';
import PropTypes from 'prop-types';


const Textarea = props => {
    const {value, onChange, className} = props;
    return(<textarea value={value} onChange={onChange} className={className}/>);
};


Textarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};


export default Textarea;