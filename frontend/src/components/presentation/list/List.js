import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const List = props => {
    const {appService, budgetService, markupService} = useContext(Context);
    const {type, income, isOpen, setIndex, onClick, expenses, currentCurrency} = props;
    const value = appService.listsSwitch(type, {inc: income, exp: expenses});

    const deleteHandler = id => {
        let item = value.find(val => val._id === id);
        isOpen();
        setIndex(item._id);
    };

    const valueRender = value.map(val => {
        const {_id, date, amount, currency, category, description} = val;
        
        return (
            <div className={'list'} key={_id}>
                <img
                    className={'list__image'}
                    alt={appService.listsSwitch(type, {
                        inc: appService.checkLanguage() ? 'повышение' : 'increase',
                        exp: appService.checkLanguage() ? 'понижение' : 'decrease',
                    })}
                    src={appService.listsSwitch(type, {
                        inc: '/icons/income.svg',
                        exp: '/icons/expenses.svg',
                    })}
                />

                <div className={'list__container'} onClick={() => onClick(_id)}>
                    <div className={'list__top'}>
                        <p className={'list__top--category'}>{category}</p>
                        <p className={'list__top--amount'}>{
                            budgetService.format(amount, currency)}</p>
                        {appService.listsSwitch(type, {
                            inc: null,
                            exp: <p className={'list__top--percentage'}>{
                                budgetService.percentage(income, amount, currentCurrency)
                            }</p>
                        })}
                        <p className={'list__top--date'}>{new Date(date).toLocaleDateString()}</p>
                    </div>

                    <p className={'list__bottom'}>
                        <span>{description}</span>
                    </p>
                </div>

                <div className={'list__close'}>
                    <img src={'/icons/close.svg'} alt={'close'} onClick={() => deleteHandler(_id)}/>
                </div>
            </div>
        );
    });

    return (
        <>
            {
                value.filter(val => currentCurrency.locales === val.currency.locales).length === 0 ?
                    <div className={'list__notes'}>
                        <p className={'list__notes--par'}>
                            {markupService.toggleListLanguage('main')}
                            <br/>
                            {markupService.toggleListLanguage('sub')}
                        </p>
                    </div> : valueRender
            }
        </>
    );
};


List.propTypes = {
    isOpen: PropTypes.func,
    onClick: PropTypes.func,
    income: PropTypes.array,
    setIndex: PropTypes.func,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object,
    type: PropTypes.string.isRequired,
};


export default List;