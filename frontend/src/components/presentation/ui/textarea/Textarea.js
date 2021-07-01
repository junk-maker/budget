import React from 'react';
import PropTypes from 'prop-types';


const Textarea = props => <textarea value={props.value} onChange={props.onChange} className={props.className}/>;


Textarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Textarea;