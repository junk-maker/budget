import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Income = props => {
    const {income, onClick, currentCurrency, setErrorPopupOpen} = props;
    return(
        <div className={'budget__value'}>
            <List
                type={'income'} income={income}
                currentCurrency={currentCurrency}
                onClick={onClick} setErrorPopupOpen={setErrorPopupOpen}
            />
        </div>
    );
};


Income.propTypes = {
    income: PropTypes.array,
    onClick: PropTypes.func,
    currentCurrency: PropTypes.object,
    setErrorPopupOpen: PropTypes.func,
};


export default Income;