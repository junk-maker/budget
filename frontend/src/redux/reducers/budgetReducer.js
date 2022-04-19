import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/constantsForBudget';

const storageService = new StorageService(localStorage);

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
};


export function getBudgetReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.BUDGET_RESET:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case actionTypes.BUDGET_ERROR:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.BUDGET_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.ADD_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.EDIT_ITEM_ERROR:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.ADD_ITEM_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.EDIT_ITEM_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_BUDGET:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.DELETE_ITEM_ERROR:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.DELETE_ITEM_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_ADD_ITEM:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.SUCCESSFUL_EDIT_ITEM:
            return {
                ...state,
                loading: false,
                income: action.income,
                expenses: action.expenses,
            };
        case actionTypes.SUCCESSFUL_DELETE_ITEM:
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