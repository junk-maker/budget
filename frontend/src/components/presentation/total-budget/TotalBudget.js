import PropTypes from 'prop-types';
import Context from '../../../context/Context';
import React, {memo, useMemo, useContext} from 'react';

const TotalBudget = memo(({income, expenses, currentCurrency}) => {
    const {budgetService, markupService} = useContext(Context);

    const valueRender =  useMemo(() => markupService.budgetTemplate(
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
    )), [income, expenses, budgetService, markupService, currentCurrency]);

    return (
        <div className={'total'}>
            {valueRender}
        </div>
    );
});

TotalBudget.propTypes = {
    income: PropTypes.array,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object,
};

export default TotalBudget;