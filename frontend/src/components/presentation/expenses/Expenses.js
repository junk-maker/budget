import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Expenses = props => <List
    type={'expenses'}
    income={props.income} expenses={props.expenses}
    onClick={props.onClick} setErrorPopupOpen={props.setErrorPopupOpen}
/>;


Expenses.propTypes = {
    onClick: PropTypes.func,
    income: PropTypes.array,
    expenses: PropTypes.array,
    setErrorPopupOpen: PropTypes.func
};


export default Expenses;