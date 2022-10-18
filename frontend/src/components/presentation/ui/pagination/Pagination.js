import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

const Pagination = ({data, pageSize, startPage, pageCount, currentPage, setPageCount, setCurrentPage, children}) => {

    useEffect(() => {
        let count = parseInt(data.length / pageSize);

        if (data?.length % pageSize > 0) count++;

        setCurrentPage(startPage);
        setPageCount(count);
    },[data?.length, pageSize, startPage, setPageCount, setCurrentPage]);

    const setPage = num => setCurrentPage(num);

    const controlHandler = () => {
        let controls = [];

        for (let i = 1; i <= pageCount; i++) {
            controls.push(
                <div 
                    key={i}
                    onClick={() => setPage(i)}
                    className={`btn-pagination ${i === currentPage ? 'btn-pagination selected' : ''}`}
                >{i}</div>
            );
        }
        return controls;
    };

    return (
        <div className={'pagination'}>
            <div className={'pagination__controls'}>
                {controlHandler()}
            </div>
            <div>{children}</div>
        </div>
    );
};

Pagination.propTypes = {
    data: PropTypes.array,
    children: PropTypes.object,
    pageSize: PropTypes.number,
    startPage: PropTypes.number,
    pageCount: PropTypes.number,
    setPageCount: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
};

export default Pagination;