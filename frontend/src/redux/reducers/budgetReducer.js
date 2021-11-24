import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/budgetConstants';

const storageService = new StorageService(localStorage);

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
};


export function getBudgetReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.ADD_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.EDIT_ITEM_FAIL:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.ADD_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.EDIT_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.EDIT_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.DELETE_ITEM_FAIL:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_BUDGET_FAIL:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_BUDGET_RESET:
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.DELETE_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.FETCH_BUDGET_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.FETCH_BUDGET_SUCCESS:
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