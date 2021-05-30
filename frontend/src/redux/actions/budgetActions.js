import ApiService from '../../services/apiService';
import {AppService} from '../../services/appService';
import * as actionTypes from '../constants/budgetConstants';

export function fetchBudget(callback) {
    return dispatch => {
        let type = 'budget';
        let url = 'budget/budget';
        let store = {
            done: fetchBudgetSuccess,
            error: fetchBudgetFail
        };
        let service = AppService;
        let fetchBudget = new ApiService(url, null, type);

        try {
            dispatch(fetchBudgetRequest());
            fetchBudget.get(store, service, dispatch, callback);
        } catch (e) {
            return dispatch(fetchBudgetFail(e));
        }
    };
}

export function fetchFeatures(callback) {
    return dispatch => {
        let type = 'features';
        let url = 'budget/features';
        let service = AppService;
        let store = {
            done: fetchFeaturesSuccess,
            error: fetchFeaturesFail
        };
        let fetchFeatures = new ApiService(url, null, type);

        try {
            dispatch(fetchFeaturesRequest());
            fetchFeatures.get(store, service, dispatch, callback);
        } catch (e) {
            return dispatch(fetchFeaturesFail(e));
        }
    };
}

export function postBudget(value, amount, category, description) {
    return dispatch => {
        let url = 'budget/budget';
        let data = {value, amount, category, description};
        let addItem = new ApiService(url, data);

        try {
            addItem.post();
        } catch (e) {
            return console.log(e)
        }
    };
}

export function budgetReset() {
    return dispatch => {
        dispatch(budgetResetState());
    };
}


//Helpers
function budgetResetState() {
    return {
        type: actionTypes.FETCH_BUDGET_RESET
    };
}

function fetchBudgetRequest() {
    return {
        type: actionTypes.FETCH_BUDGET_REQUEST
    };
}

function fetchBudgetSuccess(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.FETCH_BUDGET_SUCCESS
    };
}

function fetchBudgetFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_BUDGET_FAIL
    };
}

function fetchFeaturesRequest() {
    return {
        type: actionTypes.FETCH_FEATURES_REQUEST
    };
}

function fetchFeaturesSuccess(features) {
    return {
        payload: features,
        type: actionTypes.FETCH_FEATURES_SUCCESS
    };
}

function fetchFeaturesFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_FEATURES_FAIL
    };
}