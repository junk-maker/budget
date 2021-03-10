import React from 'react';
import Pattern from '../pattern/Pattern';


const Income = props => {
    const {type} = props;
    
    return (
        <Pattern type={type}/>
    );
};


export default Income;