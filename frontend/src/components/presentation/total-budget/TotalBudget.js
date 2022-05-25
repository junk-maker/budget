import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const TotalBudget = props => {
    const {income, expenses, currentCurrency} = props;
    const {budgetService, markupService} = useContext(Context);

    const valueRender =  markupService.budgetTemplate(
        budgetService.budget(income, expenses, currentCurrency),
        budgetService.format(income, currentCurrency),
        budgetService.format(expenses, currentCurrency),
        budgetService.percentage(income, expenses, currentCurrency)
    ).map(val => (
        <div className={'total__budget'} key={val.id}>
            <div className={'total__img-box'}>
                <img className={'total__image'} src={val.icon} alt={val.title}/>
            </div>

            <div className={'total__sum'}>
                {val.display}
            </div>
            <div className={'total__title'}>{val.title}</div>
            {val.percentage ? <div className={'total__percentage'}>{val.percentage}</div> : null}
            {val.id !== 0 ? <div className={'total__border'}/> : null}
        </div>
    ));

    return (
        <div className={'total'}>
            {valueRender}
        </div>
    );
};


TotalBudget.propTypes = {
    income: PropTypes.array,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object,
};


export default TotalBudget;