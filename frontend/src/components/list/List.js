import React from 'react';
import Button from '../ui/button/Button';
import {formatNumber} from '../../budget-library/library';



const List = props => {
    const {currency} = props;
    const valueRender = currency.map((value, idx) =>{
        const {date, amount, category, description, isActive} = value;
        return (
            <div className={'list'} key={idx}>
                <img
                    className={'list__image'}
                    alt={isActive ?'повышение' : 'понижение'}
                    src={isActive ? '/icons/income.svg' : '/icons/expenses.svg'}
                />

                <div className={'list__description'}>
                    <p className={'list__description--date'}>{date}</p>
                    <p className={'list__par'}>
                        <span>{description}</span>
                    </p>
                </div>

                <div className={'list__category'}>
                    <p className={'list__par'}>
                        {category}
                    </p>
                </div>

                <div className={'list__amount'}>
                    <p className={'list__par'}>
                        {formatNumber(amount, isActive)}
                    </p>
                </div>

                <Button className={'btn btn__delete'} icon={'ion-ios-close-outline'}/>

            </div>
        );
    });

    return (
        <>
            {
                currency.length === 0 ?
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


export default List;