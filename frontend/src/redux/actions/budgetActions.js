import * as actionTypes from '../constants/budgetConstants';
import ApiService from '../../services/apiService';

const api = new ApiService();

export function fetchBudget() {
    return dispatch => {
        try {
            dispatch(fetchBudgetRequest());
            api.getBudget().then(data => {
                const [income, expenses] = data;
                dispatch(fetchBudgetSuccess(income, expenses));
            });
        } catch (e) {
            dispatch(fetchBudgetFail(e));
        }
    };
}

export function fetchBudgetByValue(...args) {
    return dispatch => {
        const [value] = args;
        try {
            dispatch(fetchBudgetByValueRequest());
            api.getBudgetByValue(value).then(data => {
                if (value === 'income') {
                    dispatch(fetchBudgetByIncomeSuccess(data));
                } else {
                    dispatch(fetchBudgetByExpensesSuccess(data));
                }
            });
        } catch (e) {
            dispatch(fetchBudgetByValueFail(e));
        }
    };   
}


//Helpers
export function fetchBudgetRequest() {
    return {
        type: actionTypes.FETCH_BUDGET_REQUEST
    };
}

export function fetchBudgetSuccess(...args) {
    const [income, expenses] = args;
    return {
        income,
        expenses,
        type: actionTypes.FETCH_BUDGET_SUCCESS
    };
}

export function fetchBudgetFail(...args) {
    const [error] = args;
    return {
        type: actionTypes.FETCH_BUDGET_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message  
    };
}

export function fetchBudgetByValueRequest() {
    return {
        type: actionTypes.FETCH_BUDGET_BY_VALUE_REQUEST
    };
}

export function fetchBudgetByIncomeSuccess(...args) {
    const [data] = args;
    return {
        payload: data,
        type: actionTypes.FETCH_BUDGET_BY_INCOME_SUCCESS
    };
}

export function fetchBudgetByExpensesSuccess(...args) {
    const [data] = args;
    return {
        payload: data,
        type: actionTypes.FETCH_BUDGET_BY_EXPENSES_SUCCESS
    };
}

export function fetchBudgetByValueFail(...args) {
    const [error] = args;
    return {
        type: actionTypes.FETCH_BUDGET_BY_VALUE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message  
    };
}