import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/statisticConstants';

const storageService = new StorageService(localStorage);

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
};


export function getStatisticReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_STATISTIC_FAIL:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_STATISTIC_RESET:
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.FETCH_STATISTIC_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_STATISTIC_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        default:
            return state;
    }
}