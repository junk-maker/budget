import React from 'react';


const Input = props => {
    const inputType = props.type || 'text';
    return (
        <input
            type={inputType}
            value={props.value}
            className={props.className}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
            placeholder={props.placeholder}
        />
    );
};


export default Input;