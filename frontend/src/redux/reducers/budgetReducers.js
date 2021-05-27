import * as actionTypes from '../constants/budgetConstants';

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: false,
    features: null,
};

export function getBudgetReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_BUDGET_FAIL:
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
                expenses: action.expenses
            };
        case actionTypes.FETCH_FEATURES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_FEATURES_REQUEST:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.FETCH_FEATURES_SUCCESS:
            return {
                ...state,
                loading: false,
                features: action.payload
            };
        default:
            return state;       
    }
}