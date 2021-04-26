import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/button/Button';
import GetBudget from '../../../services/budgetService';



const List = props => {
    const {type, value, income} = props;
    const valueRender = value.map((val, idx) =>{
        const {date, amount, category, description} = val;
        return (
            <div className={'list'} key={idx}>
                <img
                    className={'list__image'}
                    alt={type ?'повышение' : 'понижение'}
                    src={type ? '/icons/income.svg' : '/icons/expenses.svg'}
                />

                <div className={'list__container'}>
                    <div className={'list__top'}>
                        <p className={'list__top--category'}>{category}</p>
                        <p className={'list__top--amount'}>{GetBudget.formatNumber(amount, type)}</p>
                        {!type ? <p className={'list__top--percentage'}>{GetBudget.itemPercentage(income, amount)}</p> : null}
                        <p className={'list__top--date'}>{new Date(date).toLocaleDateString()}</p>
                    </div>

                    <p className={'list__bottom'}>
                        <span>{description}</span>
                    </p>
                </div>

                {/*<div className={'list__delete'}>*/}
                {/*    <Button className={'btn btn__delete'} icon={'ion-ios-paper-outline'}/>*/}
                {/*</div>*/}

                <div className={'list__delete'}>
                    <Button className={'btn btn__delete'} icon={'ion-ios-trash-outline'}/>
                </div>
            </div>
        );
    });

    return (
        <>
            {
                value.length === 0 ?
                    <div className={'list__notes'}>
                        <p className={'list__notes--par'}>
                            Ваш лист пуст
                            <br/>
                            Пожалуйста добавте значение
                        </p>
                    </div> : valueRender
            }
        </>
    );
};


List.propTypes = {
    type: PropTypes.bool,
    value: PropTypes.array,
    income: PropTypes.array
};


export default List;