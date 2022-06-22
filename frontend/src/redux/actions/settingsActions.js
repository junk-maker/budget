import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForSettings';


export function changeEmail(email) {
    return dispatch => {
        let storeCallbacks = {
            error: changeEmailError,
            done: successfulChangeEmail,
        };
        dispatch({type: actionTypes.CHANGE_EMAIL_LAUNCH});
        let changeEmail = new ApiService('budget/settings/change-email', {email}, 'change-email');
        try {
            changeEmail.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changeEmailError(e));
        };
    };
};

export function fetchSettings(path) {
    return dispatch => {
        let storeCallbacks = {
            done: successfulSettings,
            error: settingsError
        };
        let settings = new ApiService(`budget/settings/${path.split('/')[2]}`, null, 'settings');
        dispatch({type: actionTypes.SETTINGS_LAUNCH});
        try {
            settings.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(settingsError(e));
        };
    };
};

export function deleteAccount(password) {
    return dispatch => {
        let storeCallbacks = {
            error: deleteAccountError,
            done: successfulDeleteAccount,
        };
        dispatch({type: actionTypes.DELETE_ACCOUNT_LAUNCH});
        let deleteAccount = new ApiService('budget/settings/delete-account', {password}, 'delete-account');
        try {
            deleteAccount.delete(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(deleteAccountError(e));
        };
    };
};

export function settingsResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.SETTINGS_RESET});
};

export function changePassword(password, newPassword, confirmPassword) {
    return dispatch => {
        let storeCallbacks = {
            error: changePasswordError,
            done: successfulChangePassword,
        };
        dispatch({type: actionTypes.CHANGE_PASSWORD_LAUNCH});
        let changePassword = new ApiService('budget/settings/change-password', {password, newPassword, confirmPassword}, 'change-password');
        try {
            changePassword.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changePasswordError(e));
        };
    };
};


//Helpers
function settingsError(error) {
    return {
        payload: error,
        type: actionTypes.SETTINGS_ERROR
    };
};

function changeEmailError(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_EMAIL_ERROR
    };
};

function successfulSettings(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_SETTINGS
    };
};

function deleteAccountError(error) {
    return {
        payload: error,
        type: actionTypes.DELETE_ACCOUNT_ERROR
    };
};

function changePasswordError(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_PASSWORD_ERROR
    };
};

function successfulChangeEmail(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_CHANGE_EMAIL
    };
};

function successfulDeleteAccount(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_DELETE_ACCOUNT
    };
};

function successfulChangePassword(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_CHANGE_PASSWORD
    };
};