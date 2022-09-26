import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Input = memo(({type, value, result, strength, onChange, className, autoComplete, placeholder}) => {
    return (
        <>
            <input
                value={value}
                onChange={onChange}
                className={className}
                type={type || 'text'}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            {strength ?  <span className={'strength-password'}  data-score={result.score}/> : null}
        </>
    );
});

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    result: PropTypes.object,
    onChange: PropTypes.func,
    strength: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
};

export default Input;