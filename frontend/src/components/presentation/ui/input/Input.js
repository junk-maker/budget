import React from 'react';
import PropTypes from 'prop-types';


const Input = props => {
    const inputType = props.type || 'text';

    return (
        <input
            id={props.id}
            type={inputType}
            value={props.value}
            onChange={props.onChange}
            className={props.className}
            onKeyPress={props.onKeyPress}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
        />
    );
};

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
};


export default Input;