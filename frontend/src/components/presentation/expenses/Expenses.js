import React from 'react';
import List from '../list/List';


const Expenses = props => <List type={'expenses'} expenses={props.expenses} income={props.income}/>;


export default Expenses;