import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Expenses = props => {
    const {income, onClick, expenses, currentCurrency, setErrorPopupOpen} = props;
    return(
        <div className={'budget__value'}>
            <List
                currentCurrency={currentCurrency}
                type={'expenses'} income={income} expenses={expenses}
                onClick={onClick} setErrorPopupOpen={setErrorPopupOpen}
            />;
        </div>
    );
};


Expenses.propTypes = {
    onClick: PropTypes.func,
    income: PropTypes.array,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object,
    setErrorPopupOpen: PropTypes.func,
};


export default Expenses;