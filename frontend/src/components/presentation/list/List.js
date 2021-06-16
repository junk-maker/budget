import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import Button from '../ui/button/Button';
import AppService from '../../../services/appService';
import BudgetService from '../../../services/budgetService';
import {deleteItem} from '../../../redux/actions/budgetActions';


const List = props => {
    const dispatch = useDispatch();
    const appService = new AppService();
    const budgetService = new BudgetService();
    const {type, income, expenses, onClick, setErrorPopupOpen} = props;
    const value = appService.listsToggle(type, {inc: income, exp: expenses});

    const deleteHandler = (id) => {
        dispatch(
            deleteItem(id, setErrorPopupOpen)
        );
    };

    const valueRender = value.map((val, idx) => {
        const {_id, date, coin, amount, category, description} = val;
        return (
            <div className={'list'} key={idx}>
                <img
                    className={'list__image'}
                    alt={appService.listsToggle(type, {
                        inc: 'повышение',
                        exp: 'понижение',
                    })}
                    src={appService.listsToggle(type, {
                        inc: '/icons/income.svg',
                        exp: '/icons/expenses.svg',
                    })}
                />

                <div className={'list__container'} onClick={() => onClick(_id)}>
                    <div className={'list__top'}>
                        <p className={'list__top--category'}>{category}</p>
                        <p className={'list__top--amount'}>{budgetService.format(amount, coin)}</p>
                        {appService.listsToggle(type, {
                            inc: null,
                            exp: <p className={'list__top--percentage'}>{budgetService.percentage(income, amount)}</p>
                        })}
                        <p className={'list__top--date'}>{new Date(date).toLocaleDateString()}</p>
                    </div>

                    <p className={'list__bottom'}>
                        <span>{description}</span>
                    </p>
                </div>

                <div className={'list__delete'}>
                    <Button
                        className={'btn btn__delete'}
                        icon={'ion-ios-trash-outline'}
                        onClick={() => deleteHandler(_id)}
                    />
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
    type: PropTypes.string,
    income: PropTypes.array,
    onClick: PropTypes.func,
    expenses: PropTypes.array,
    setErrorPopupOpen: PropTypes.func
};


export default List;