import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const TotalBudget = props => {
    const {income, expenses, currentCurrency} = props;
    const {budgetService, markupService} = useContext(Context);

    const valueRender =  markupService.budgetPattern(
        budgetService.budget(income, expenses, currentCurrency),
        budgetService.format(income, currentCurrency),
        budgetService.format(expenses, currentCurrency),
        budgetService.percentage(income, expenses, currentCurrency)
    ).map(val => (
        <div className={'budget__total--all'} key={val.id}>
            <div className={'budget__total--box'}>
                <img className={'budget__total--image'} src={val.icon} alt={val.name}/>
            </div>

            <div className={'budget__total--sum'}>
                {val.display}
            </div>
            <div className={'budget__total--heading'}>{val.name}</div>
            {val.percentage ? <div className={'budget__total--percentage'}>{val.percentage}</div> : null}
        </div>
    ));

    return (
        <div className={'budget__total'}>
            <div className={'budget__total--one'}/>
            <div className={'budget__total--two'}/>
            {valueRender}
        </div>
    );
};


TotalBudget.propTypes = {
    income: PropTypes.array,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object
};


export default TotalBudget;