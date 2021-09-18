import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/budgetConstants';


export function fetchBudget(callback) {
    return dispatch => {
        let type = 'budget';
        let url = 'budget/budget';
        let store = {
            error: fetchBudgetFail,
            done: fetchBudgetSuccess,
        };
        let budget = new ApiService(url, null, type);

        try {
            dispatch(fetchBudgetRequest());
            budget.get(store, dispatch, callback);
        } catch (e) {
            return dispatch(fetchBudgetFail(e));
        }
    };
}

export function addItem(value, currency, autoClosing, callback, amount, category, description, currentMonth) {
    return dispatch => {
        let data = {value, currency, amount, category, description, currentMonth};
        let url = 'budget/budget';
        let type = 'add-item';
        let storeCallbacks = {
            error: addItemFail,
            done: addItemSuccess,
            autoClosing: autoClosing
        };
        let addItem = new ApiService(url, data, type);

        try {
            dispatch(addItemRequest());
            addItem.post(storeCallbacks, dispatch, callback);
        } catch (e) {
            return dispatch(addItemFail(e));
        }
    };
}

export function deleteItem(id, callback) {
    return dispatch => {
        let type = 'budget-delete';
        let url = `budget/budget/${id}`;
        let storeCallbacks = {
            error: deleteItemFail,
            done: deleteItemSuccess,
        };
        let deleteItem = new ApiService(url, null, type);

        try {
            dispatch(deleteItemRequest());
            deleteItem.delete(storeCallbacks, dispatch, callback);
        } catch (e) {
            return dispatch(deleteItemFail(e));
        }
    }
}

export function editItem(id, value, currency, callback, amount, category, description) {
    return dispatch => {
        let type = 'edit-item';
        let url = `budget/budget`;
        let storeCallbacks = {
            error: editItemFail,
            done: editItemSuccess,
        };
        let data = {id, value, currency, amount, category, description};
        let editItem = new ApiService(url, data, type);

        try {
            dispatch(editItemRequest());
            editItem.put(storeCallbacks, dispatch, callback);
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