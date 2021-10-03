import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Income = props => {
    const {income, monthId, onClick, currentCurrency} = props;
    return(
        <div className={'budget__value'}>
            <List
                monthId={monthId}
                onClick={onClick}
                type={'income'} income={income}
                currentCurrency={currentCurrency}
            />
        </div>
    );
};


Income.propTypes = {
    income: PropTypes.array,
    onClick: PropTypes.func,
    monthId: PropTypes.number,
    currentCurrency: PropTypes.object
};


export default Income;