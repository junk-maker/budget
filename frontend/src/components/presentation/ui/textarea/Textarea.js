import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Textarea = memo(({value, onChange, className}) => (<textarea value={value} onChange={onChange} className={className}/>));

Textarea.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

export default Textarea;