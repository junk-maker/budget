import React from 'react';
import Button from '../ui/button/Button';
import LibraryService from '../../services/appService';



const List = props => {
    const {type, value} = props;
    const library = new LibraryService();
    const valueRender = value.map((val, idx) =>{
        const {date, amount, category, description} = val;
        return (
            <div className={'list'} key={idx}>
                <img
                    className={'list__image'}
                    alt={type ?'повышение' : 'понижение'}
                    src={type ? '/icons/income.svg' : '/icons/expenses.svg'}
                />

                <div className={'list__description'}>
                    <p className={'list__description--date'}>{new Date(date).toLocaleDateString()}</p>
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
                        {library.formatNumber(amount, type)}
                    </p>
                </div>

                <Button className={'btn btn__delete'} icon={'ion-ios-close-outline'}/>

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


export default List;