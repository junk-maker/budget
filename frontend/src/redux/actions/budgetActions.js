import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForBudget';


export function fetchBudget(monthId) {
    return dispatch => {
        let type = 'budget';
        let url = 'budget/budget';
        let store = {
            error: budgetError,
            done: successfulBudget,
        };
        let budget = new ApiService(url, null, type);
        dispatch({type: actionTypes.BUDGET_LAUNCH});
        try {
            budget.get(store, dispatch, monthId);
        } catch (e) {
            return dispatch(budgetError(e));
        }
    };
};

export function deleteItem(id, monthId) {
    return dispatch => {
        let type = 'delete-budget';
        let url = `budget/budget/${id}`;
        let storeCallbacks = {
            error: deleteItemError,
            done: successfulDeleteItem,
        };
        dispatch({type: actionTypes.DELETE_ITEM_LAUNCH});
        let deleteItem = new ApiService(url, null, type);
        try {
            deleteItem.delete(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(deleteItemError(e));
        }
    };
};

export function budgetResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.BUDGET_RESET});
};

export function addItem(value, monthId, currency, amount, category, description) {
    return dispatch => {
        let data = {value, currency, amount, category, description};
        let url = `budget/budget`;
        let type = 'add-item';
        let storeCallbacks = {
            error: addItemError,
            done: successfulAddItem,
        };
        let addItem = new ApiService(url, data, type);
        dispatch({type: actionTypes.ADD_ITEM_LAUNCH});
        try {
            addItem.post(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(addItemError(e));
        }
    };
};

export function editItem(id, value, monthId, currency, amount, category, description) {
    return dispatch => {
        let type = 'edit-item';
        let url = `budget/budget`;
        let storeCallbacks = {
            error: editItemError,
            done: successfulEditItem,
        };
        let data = {id, value, currency, amount, category, description, monthId};
        let editItem = new ApiService(url, data, type);
        dispatch({type: actionTypes.EDIT_ITEM_LAUNCH});
        try {
            editItem.put(storeCallbacks, dispatch, monthId);
        } catch (e) {
            return dispatch(editItemError(e));
        }
    };
};


//Helpers
function budgetError(error) {
    return {
        payload: error,
        type: actionTypes.BUDGET_ERROR
    };
};

function addItemError(error) {
    return {
        payload: error,
        type: actionTypes.ADD_ITEM_ERROR
    };
};

function editItemError(error) {
    return {
        payload: error,
        type: actionTypes.EDIT_ITEM_ERROR
    };
};

function deleteItemError(error) {
    return {
        payload: error,
        type: actionTypes.DELETE_ITEM_ERROR
    };
};

function successfulBudget(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.SUCCESSFUL_BUDGET
    };
};

function successfulAddItem(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.SUCCESSFUL_ADD_ITEM
    };
};

function successfulEditItem(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.SUCCESSFUL_EDIT_ITEM
    };
};

function successfulDeleteItem(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.SUCCESSFUL_DELETE_ITEM
    };
};