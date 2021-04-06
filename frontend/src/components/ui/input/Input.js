import React from 'react';


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
        />
    );
};


export default Input;