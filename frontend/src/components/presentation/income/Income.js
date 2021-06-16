import React from 'react';
import List from '../list/List';
import PropTypes from 'prop-types';


const Income = props => <List
    type={'income'} income={props.income}
    onClick={props.onClick} setErrorPopupOpen={props.setErrorPopupOpen}
/>;


Income.propTypes = {
    income: PropTypes.array,
    onClick: PropTypes.func,
    setErrorPopupOpen: PropTypes.func
};


export default Income;