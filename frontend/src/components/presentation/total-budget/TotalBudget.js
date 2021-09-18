import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const TotalBudget = props => {
    const {income, expenses, currentCurrency} = props;
    const {appService, budgetService, markupService} = useContext(Context);
    console.log('work')

    const createValue = (name, control) =>
        <div className={'budget__total--all'} key={control.id}>
            <div className={'budget__total--box'}>
                <img className={'budget__total--image'} src={control.icon} alt={control.name}/>
            </div>

            <div className={'budget__total--sum'}>
                {control.display}
            </div>
            <div className={'budget__total--heading'}>{control.name}</div>
            {control.percentage ? <div className={'budget__total--percentage'}>{control.percentage}</div> : null}
        </div>
    ;

    return(
        <div className={'budget__total'}>
            <div className={'budget__total--one'}/>
            <div className={'budget__total--two'}/>
            {
                appService.objectIteration(
                    markupService.budgetPattern(
                        budgetService.budget(income, expenses, currentCurrency),
                        budgetService.format(income, currentCurrency),
                        budgetService.format(expenses, currentCurrency),
                        budgetService.percentage(income, expenses, currentCurrency)
                    ), createValue
                )
            }
        </div>
    );
};


TotalBudget.propTypes = {
    income: PropTypes.array,
    markup: PropTypes.object,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object
};


export default TotalBudget;