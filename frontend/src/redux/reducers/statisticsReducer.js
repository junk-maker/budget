import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/constantsForStatistics';

const storageService = new StorageService(localStorage);

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
};


export function getStatisticsReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.STATISTICS_ERROR:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.STATISTICS_RESET:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case actionTypes.STATISTICS_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_STATISTICS:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        default:
            return state;
    };
};