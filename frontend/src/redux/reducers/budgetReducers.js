import * as actionTypes from '../constants/budgetConstants';

const initialState = {
    income: [],
    error: null,
    expenses: [],
    loading: true,
};

export function getBudgetReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_BUDGET_FAIL:
            return {
                income: [],
                expenses: [],
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_BUDGET_REQUEST:
            return {
                income: [],
                error: null,
                expenses: [],
                loading: true,
            };
        case actionTypes.FETCH_BUDGET_SUCCESS:
            return {
                error: null,
                loading: false,
                income: action.income,
                expenses: action.expenses
            };
        default:
            return state;       
    }
}


export function getBudgetByValueReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.FETCH_BUDGET_BY_VALUE_FAIL:
            return {
                income: [],
                expenses: [],
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_BUDGET_BY_VALUE_REQUEST:
            return {
                income: [],
                error: null,
                expenses: [],
                loading: true
            };
        case actionTypes.FETCH_BUDGET_BY_INCOME_SUCCESS:
            return {
                error: null,
                expenses: [],
                loading: false,
                income: action.payload
            };    
        case actionTypes.FETCH_BUDGET_BY_EXPENSES_SUCCESS:
            return {
                income: [],
                error: null,
                loading: false,
                expenses: action.payload
            };        
        default:
            return state;    
    }
}