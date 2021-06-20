import ApiService from '../../services/apiService';
import AppService from '../../services/appService';
import * as actionTypes from '../constants/budgetConstants';

export function fetchBudget(callback) {
    return dispatch => {
        let type = 'budget';
        let url = 'budget/budget';
        let store = {
            done: fetchBudgetSuccess,
            error: fetchBudgetFail
        };
        let appService = new AppService();
        let fetchBudget = new ApiService(url, null, type);

        try {
            dispatch(fetchBudgetRequest());
            fetchBudget.get(store, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchBudgetFail(e));
        }
    };
}

export function fetchFeatures(callback) {
    return dispatch => {
        let type = 'features';
        let url = 'budget/features';
        let appService = new AppService();
        let storeCallbacks = {
            done: fetchFeaturesSuccess,
            error: fetchFeaturesFail
        };
        let fetchFeatures = new ApiService(url, null, type);

        try {
            dispatch(fetchFeaturesRequest());
            fetchFeatures.get(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchFeaturesFail(e));
        }
    };
}

export function addItem(value, currency, autoClosing, callback, amount, category, description) {
    return dispatch => {
        let data = {value, currency, amount, category, description};
        let appService = new AppService();
        let url = 'budget/budget';
        const type = 'add-item';
        let storeCallbacks = {
            error: addItemFail,
            done: addItemSuccess,
            autoClosing: autoClosing
        };
        let addItem = new ApiService(url, data, type);

        try {
            dispatch(addItemRequest());
            addItem.post(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(addItemFail(e));
        }
    };
}

export function deleteItem(id, callback) {
    return dispatch => {
        let url = `budget/budget/${id}`;
        let storeCallbacks = {
            error: deleteItemFail,
            done: deleteItemSuccess,
        };
        let appService = new AppService();
        let deleteItem = new ApiService(url);

        try {
            dispatch(deleteItemRequest());
            deleteItem.delete(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(deleteItemFail(e));
        }
    }
}

export function editItem(id, value, currency, callback, amount, category, description) {
    return dispatch => {
        let data = {id, value, currency, amount, category, description};
        let url = `budget/budget`;
        let storeCallbacks = {
            error: editItemFail,
            done: editItemSuccess,
        };
        let editItem = new ApiService(url, data);
        let appService = new AppService();

        try {
            dispatch(editItemRequest());
            editItem.put(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(editItemFail(e));
        }

    };
}

export function budgetReset() {
    return dispatch => {
        dispatch(budgetResetState());
    };
}


//Helpers
function addItemFail(error) {
    return {
        payload: error,
        type: actionTypes.ADD_ITEM_FAIL
    };
}

function addItemRequest() {
    return {
        type: actionTypes.ADD_ITEM_REQUEST
    };
}

function addItemSuccess(income, expenses, currency) {
    return {
        income,
        expenses,
        currency,
        type: actionTypes.ADD_ITEM_SUCCESS
    };
}

function editItemFail(error) {
    return {
        payload: error,
        type: actionTypes.EDIT_ITEM_FAIL
    };
}

function editItemRequest() {
    return {
        type: actionTypes.EDIT_ITEM_REQUEST
    };
}

function editItemSuccess(income, expenses, currency) {
    return {
        income,
        expenses,
        currency,
        type: actionTypes.EDIT_ITEM_SUCCESS
    };
}

function deleteItemFail(error) {
    return {
        payload: error,
        type: actionTypes.DELETE_ITEM_FAIL
    };
}

function deleteItemRequest() {
    return {
        type: actionTypes.DELETE_ITEM_REQUEST
    };
}

function deleteItemSuccess(income, expenses, currency) {
    return {
        income,
        expenses,
        currency,
        type: actionTypes.DELETE_ITEM_SUCCESS
    };
}

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

function fetchBudgetSuccess(income, expenses, currency) {
    return {
        income,
        expenses,
        currency,
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