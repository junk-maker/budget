import {useState} from 'react';

const usePagination = () => {
    const [pageCount, setPageCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);

    return {pageCount, setPageCount, currentPage, setCurrentPage};
};

export default usePagination;