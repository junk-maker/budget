import List from '../list/List';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';
import Pagination from '../ui/pagination/Pagination';


const Expenses = props => {
    const {appService} = useContext(Context);
    const {income, monthId, setIndex, onClick, expenses, pageSize, startPage, 
        pageCount, currentPage, setPageCount, setCurrentPage, currentCurrency, openRemoveHandler} = props;

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
                    monthId={monthId}
                    setIndex={setIndex}
                    isOpen={openRemoveHandler} 
                    currentCurrency={currentCurrency}
                    type={'expenses'} income={income} onClick={onClick}
                    expenses={appService.paginatedDataHandler(expenses, pageSize, currentPage, currentCurrency)}
                />
            </div>
        </Pagination>
    );
};


Expenses.propTypes = {
    onClick: PropTypes.func,
    income: PropTypes.array,
    setIndex: PropTypes.func,
    expenses: PropTypes.array,
    monthId: PropTypes.number,
    pageSize: PropTypes.number,
    startPage: PropTypes.number,
    pageCount: PropTypes.number,
    setPageCount: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    currentCurrency: PropTypes.object,
    openRemoveHandler: PropTypes.func,
};


export default Expenses;