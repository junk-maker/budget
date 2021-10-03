import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Expenses = props => {
    const {income, monthId, onClick, expenses, currentCurrency} = props;
    return(
        <div className={'budget__value'}>
            <List
                monthId={monthId}
                currentCurrency={currentCurrency} onClick={onClick}
                type={'expenses'} income={income} expenses={expenses}
            />
        </div>
    );
};


Expenses.propTypes = {
    onClick: PropTypes.func,
    income: PropTypes.array,
    expenses: PropTypes.array,
    monthId: PropTypes.number,
    currentCurrency: PropTypes.object
};


export default Expenses;