import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';


const List = props => {
    const {type, setId, income, isOpen, onClick, expenses, currentCurrency} = props;
    const {budgetService, markupService} = useContext(Context);
    const value = {income: income, expenses: expenses}[type];

    const deleteHandler = id => {
        isOpen();
        setId(value.find(val => val._id === id)._id);
    };

    const valueRender = value.map(val => {
        const {_id, date, amount, currency, category, description} = val;
        
        return (
            <div className={'list'} key={_id}>
                <img
                    className={'list__image'}
                    alt={markupService.svgHeadingTemplate()[type]}
                    src={{income: '/icons/income.svg', expenses: '/icons/expenses.svg',}[type]}
                />

                <div className={'list__container'} onClick={() => onClick(_id)}>
                    <div className={'list__top'}>
                        <p className={'list__category'}>{category}</p>
                        <p className={'list__amount'}>{
                            budgetService.format(amount, currency)}</p>
                        {{expenses: <p className={'list__percentage'}>{
                            budgetService.percentage(income, amount, currentCurrency)}</p>
                        }[type]}
                        <p className={'list__date'}>{new Date(date).toLocaleDateString()}</p>
                    </div>

                    <p className={'list__bottom'}>
                        <span>{description}</span>
                    </p>
                </div>

                <div className={'list__close'}>
                    <img 
                        src={'/icons/close.svg'} 
                        onClick={() => deleteHandler(_id)}
                        alt={markupService.svgHeadingTemplate()['close']} 
                    />
                </div>
            </div>
        );
    });

    return (
        <>
            {
                value.filter(val => currentCurrency.locales === val.currency.locales).length === 0 ?
                    <div className={'list__notes'}>
                        <p className={'list__text'}>
                            {markupService.listHeadingTemplate()['title']}
                            <br/>
                            {markupService.listHeadingTemplate()['subtitle']}
                        </p>
                    </div> 
                : valueRender
            }
        </>
    );
};


List.propTypes = {
    setId: PropTypes.func,
    isOpen: PropTypes.func,
    onClick: PropTypes.func,
    income: PropTypes.array,
    expenses: PropTypes.array,
    currentCurrency: PropTypes.object,
    type: PropTypes.string.isRequired,
};


export default List;