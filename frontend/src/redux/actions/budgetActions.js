//import axios from 'axios';
import * as actionTypes from '../constants/budgetConstants';
import ApiService from '../../budget-service/apiService';

export function fetchBudget() {
    return (dispatch) => {
        const api = new ApiService();
        try {
            dispatch(fetchBudgetRequest());
            api.getBudget().then(data => {
                const [income, epxpenses] = data;
                dispatch(fetchBudgetSuccess(income, epxpenses));
            });
        } catch (e) {
            dispatch(fetchBudgetFail(e));
        }
    };
};


//Helpers
export function fetchBudgetRequest() {
    return {
        type: actionTypes.FETCH_BUDGET_REQUEST
    };
};

export function fetchBudgetSuccess(...args) {
    const [income, expenses] = args;
    return {
        income,
        expenses,
        type: actionTypes.FETCH_BUDGET_SUCCESS
    };
};

export function fetchBudgetFail(...args) {
    const [error] = args;
    return {
        type: actionTypes.FETCH_BUDGET_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message  
    };
};