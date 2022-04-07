import List from '../list/List';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import Context from '../../../context/Context';
import Pagination from '../ui/pagination/Pagination';


const Income = props => {
    const {appService} = useContext(Context);
    const {income, monthId, setIndex, onClick, pageSize, startPage, 
        pageCount, currentPage, setPageCount, setCurrentPage, currentCurrency, openRemoveHandler} = props;
    
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
                    monthId={monthId}
                    onClick={onClick}
                    setIndex={setIndex}
                    isOpen={openRemoveHandler}
                    type={'income'} currentCurrency={currentCurrency}
                    income={appService.paginatedDataHandler(income, pageSize, currentPage, currentCurrency)}
                />
            </div>
        </Pagination>
    );
};


Income.propTypes = {
    income: PropTypes.array,
    onClick: PropTypes.func,
    setIndex: PropTypes.func,
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


export default Income;