import React from 'react';
import PropTypes from 'prop-types';


const Input = props => {
    const {type, value, result, onChange, className, autoComplete, placeholder} = props;
    const inputType = type || 'text';
    return (
        <>
            <input
                value={value}
                type={inputType}
                onChange={onChange}
                className={className}
                // onKeyPress={props.onKeyPress}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {props.strength ?  <span className={'strength-password'}  data-score={result.score}/> : null}
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    result: PropTypes.object,
    onChange: PropTypes.func,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
};


export default Input;