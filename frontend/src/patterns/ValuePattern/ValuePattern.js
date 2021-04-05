import React, {useState} from 'react';
import Button from '../../components/ui/button/Button';
import {useSelector} from 'react-redux';
import List from '../../components/list/List';
import Modal from '../../components/modal/Modal';
import AddData from '../../components/add-data/AddData';
import Spinner from '../../components/ui/spinner/Spinner';


const ValuePattern  = props => {
    const {type} = props;
    let currency = 'рубль';
    let currencySymbol = 'rub';
    const header = type ? 'доход' : 'расходы';
    const [isOpen, setIsOpen] = useState(false);
    const budgetActions =  useSelector(state => state.getBudgetByValue);
    const {loading, income, expenses} = budgetActions;
    // const income = [
    //     {description: 'зарплата', category: 'работа', amount: 20000, isActive: true, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: true, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: true, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: true, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: true, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: true, date: '21.02.2021'}
    // ];

    // const expenses = [
    //     {description: 'зарплата', category: 'работа', amount: 200, isActive: false, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: false, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: false, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: false, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: false, date: '21.02.2021'},
    //     {description: 'аренда', category: 'бизнесс', amount: 700, isActive: false, date: '21.02.2021'}
    // ];

    return (
        <>
            <div className={'pattern'}>
                <div className={'pattern__header'}>
                    <div className={'pattern__header--title'}>{header}</div>

                    <div className={'pattern__header--subtitle'}>
                        валюта - {currency} ({currencySymbol})
                    </div>
                </div>



                {
                    loading ? 
                        <Spinner/> : 
                            <div className={'pattern__container'}>
                                <div className={'pattern__container--wrapper'}>
                                    <List 
                                        type={type}
                                        value={type ? income : expenses}/>
                                </div>
                            </div>
                }

                <div className={'pattern__btn'}>
                    <Button className={'btn btn__modal'} onClick={() => setIsOpen(!isOpen)}>
                        Добавить
                    </Button>
                </div>
            </div>

            <Modal active={isOpen} setActive={setIsOpen}>
                <AddData/>
            </Modal>
        </>
    );
};


export default ValuePattern;