import List from '../list/List';
import PropTypes from 'prop-types';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';
import Pagination from '../ui/pagination/Pagination';


const Expenses = memo(props => {
    const {appService} = useContext(Context);
    const {setId, income, onClick, expenses, pageSize, startPage,  pageCount, setPopupOpen,
        currentPage, setPageCount, setCurrentPage, currentCurrency, openRemoveHandler} = props
    ;

    return (
        <Pagination
            pageSize={pageSize} 
            startPage={startPage}  
            pageCount={pageCount} 
            currentPage={currentPage} 
            setPageCount={setPageCount} 
            setCurrentPage={setCurrentPage}
            data={expenses.filter(val => currentCurrency.locales === val.currency.locales)}
        >
            <div className={'budget__value'}>
                <List
                    setId={setId}
                    isOpen={openRemoveHandler} 
                    setPopupOpen={setPopupOpen}
                    currentCurrency={currentCurrency}
                    type={'expenses'} income={income} onClick={onClick}
                    expenses={appService.paginatedDataHandler(expenses, pageSize, currentPage, currentCurrency)}
                />
            </div>
        </Pagination>
    );
});


Expenses.propTypes = {
    setId: PropTypes.func,
    onClick: PropTypes.func,
    income: PropTypes.array,
    expenses: PropTypes.array,
    pageSize: PropTypes.number,
    startPage: PropTypes.number,
    pageCount: PropTypes.number,
    setPopupOpen: PropTypes.func,
    setPageCount: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    currentCurrency: PropTypes.object,
    openRemoveHandler: PropTypes.func,
};


export default Expenses;