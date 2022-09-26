import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, disabled, children, className}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={className}>{children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.object,
    className: PropTypes.string,
};

export default Button;