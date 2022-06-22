import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForBudget';


export function fetchBudget(end, start, year, month, currency) {
    return dispatch => {
        let store = {
            error: budgetError,
            done: successfulBudget,
        };
        let budget = new ApiService(`budget/budget/${end}/${start}/${year}/${month}/${currency.currency}`, null, 'budget');
        dispatch({type: actionTypes.BUDGET_LAUNCH});
        try {
            budget.get(store, dispatch);
        } catch (e) {
            return dispatch(budgetError(e));
        };
    };
};

export function deleteItem(id, end, year, start, month, currency) {
    return dispatch => {
        let storeCallbacks = {
            error: deleteItemError,
            done: successfulDeleteItem,
        };
        dispatch({type: actionTypes.DELETE_ITEM_LAUNCH});
        let deleteItem = new ApiService(`budget/budget/${id}/${end}/${start}/${year}/${month}/${currency.currency}`, null, 'delete-budget');
        try {
            deleteItem.delete(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(deleteItemError(e));
        };
    };
};

export function budgetResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.BUDGET_RESET});
};

export function addItem(end, start, year, month, value, currency, amount, category, description) {
    return dispatch => {
        let storeCallbacks = {
            error: addItemError,
            done: successfulAddItem,
        };
        let addItem = new ApiService(`budget/budget/${end}/${start}/${year}/${month}/${currency.currency}`, {value, currency, amount, category, description}, 'add-item');
        dispatch({type: actionTypes.ADD_ITEM_LAUNCH});
        try {
            addItem.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(addItemError(e));
        };
    };
};

export function editItem(id, end, year, start, month, value, currency, amount, category, description) {
    return dispatch => {
        let storeCallbacks = {
            error: editItemError,
            done: successfulEditItem,
        };
        let editItem = new ApiService(`budget/budget/${end}/${start}/${year}/${month}/${currency.currency}`, {id, value, currency, amount, category, description}, 'edit-item');
        dispatch({type: actionTypes.EDIT_ITEM_LAUNCH});
        try {
            editItem.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(editItemError(e));
        };
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