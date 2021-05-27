import React from 'react';


const Select = props => {
    return (
        <select
            onChange={props.onChange}
            className={props.className}
        >
            {props.options.map((option, index) => {
                return (
                    <option
                        value={option.value}
                        key={option.value + index}
                    >
                        {option.value}
                    </option>
                );
            })}
        </select>
    );
};


export default Select;