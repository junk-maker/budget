import React from 'react';


const Values = props => {
    const render = props.render;
    const value = props.value.values;

    return (
        <div>
            {render[value]['description']}
        </div>
    );
};


export default Values;