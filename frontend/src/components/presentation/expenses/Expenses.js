import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Expenses = props => <List
    type={'expenses'}
    income={props.income} expenses={props.expenses}
    onClick={props.onClick} setErrorPopupOpen={props.setErrorPopupOpen}
/>;


Expenses.propTypes = {
    income: PropTypes.array,
    onClick: PropTypes.func,
    expenses: PropTypes.array,
    setErrorPopupOpen: PropTypes.func
};


export default Expenses;