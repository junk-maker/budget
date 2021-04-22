import React from 'react';
import List from '../list/List';


const Expenses = props => {
    return(
        <List type={props.type} value={props.value} income={props.income}/>
    );
};


export default Expenses;