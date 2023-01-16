import {useState} from 'react';
import {UsePaginationInterface} from './hooks.interface';

const usePagination = (): UsePaginationInterface => {
    const [pageCount, setPageCount] = useState<null>(null);
    const [currentPage, setCurrentPage] = useState<null>(null);

    return {pageCount, setPageCount, currentPage, setCurrentPage,};
};

export default usePagination;