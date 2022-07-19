import List from '../list/List';
import PropTypes from 'prop-types';
import React, {memo, useContext} from 'react';
import Context from '../../../context/Context';
import Pagination from '../ui/pagination/Pagination';


const Income = memo(props => {
    const {appService} = useContext(Context);
    const {setId, income, onClick, pageSize, startPage, pageCount, setPopupOpen,
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
            data={income.filter(val => currentCurrency.locales === val.currency.locales)} 
        >
            <div className={'budget__value'}>
                <List
                    setId={setId}
                    onClick={onClick}
                    isOpen={openRemoveHandler}
                    setPopupOpen={setPopupOpen}
                    type={'income'} currentCurrency={currentCurrency}
                    income={appService.paginatedDataHandler(income, pageSize, currentPage, currentCurrency)}
                />
            </div>
        </Pagination>
    );
});


Income.propTypes = {
    setId: PropTypes.func,
    income: PropTypes.array,
    onClick: PropTypes.func,
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


export default Income;