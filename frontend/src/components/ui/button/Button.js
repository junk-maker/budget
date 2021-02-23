import React from 'react';

const Button = props => {
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={props.className}><i className={props.icon}/>{props.children}
        </button>
    );
};


export default Button;