import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/budgetConstants';


export function fetchBudget(monthId) {
    return dispatch => {
        let type = 'budget';
        let url = 'budget/budget';
        let store = {
            error: fetchBudgetFail,
            done: fetchBudgetSuccess,
        };
        let budget = new ApiService(url, null, type);
        dispatch({type: actionTypes.FETCH_BUDGET_REQUEST});

        try {
            budget.get(store, dispatch, monthId);
        } catch (e) {
            return dispatch(fetchBudgetFail(e));
        }
    };
}

export function addItem(value, monthId, currency, amount, category, description) {
    return dispatch => {
        let data = {value, currency, amount, category, description};
        let url = `budget/budget`;
        let type = 'add-item';
        let storeCallbacks = {
            error: addItemFail,
            done: addItemSuccess,
        };
        let addItem = new ApiService(url, data, type);
        dispatch({type: actionTypes.ADD_ITEM_REQUEST});
        try {
            addItem.post(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(addItemFail(e));
        }
    };
}

export function deleteItem(id, monthId) {
    return dispatch => {
        let type = 'budget-delete';
        let url = `budget/budget/${id}`;
        let storeCallbacks = {
            error: deleteItemFail,
            done: deleteItemSuccess,
        };
        dispatch({type: actionTypes.DELETE_ITEM_REQUEST});
        let deleteItem = new ApiService(url, null, type);

        try {
            deleteItem.delete(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(deleteItemFail(e));
        }
    }
}

export function editItem(id, value, monthId, currency, amount, category, description) {
    return dispatch => {
        let type = 'edit-item';
        let url = `budget/budget`;
        let storeCallbacks = {
            error: editItemFail,
            done: editItemSuccess,
        };
        let data = {id, value, currency, amount, category, description, monthId};
        dispatch({type: actionTypes.EDIT_ITEM_REQUEST});
        let editItem = new ApiService(url, data, type);

        try {
            editItem.put(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(editItemFail(e));
        }
    };
}

export function budgetResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_BUDGET_RESET});
    };
}


//Helpers
function addItemFail(error) {
    return {
        payload: error,
        type: actionTypes.ADD_ITEM_FAIL
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

function deleteItemSuccess(income, expenses, currency) {
    return {
        income,
        expenses,
        currency,
        type: actionTypes.DELETE_ITEM_SUCCESS
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