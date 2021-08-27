import React from 'react';


const TotalBudget = props => {
    const {schema, income, expenses, appService, budgetService, currentCurrency} = props;

    const createValue = (idx, name, control) =>
        <div className={'budget__total--all'} key={idx + name}>
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
                    schema.budgetSchema(
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


export default TotalBudget;