import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForSettings';


export function changeEmail(email) {
    return dispatch => {
        let data = {email};
        let type = 'change-email';
        let storeCallbacks = {
            error: changeEmailError,
            done: successfulChangeEmail,
        };
        let url = 'budget/settings/change-email';
        dispatch({type: actionTypes.CHANGE_EMAIL_LAUNCH});
        let changeEmail = new ApiService(url, data, type);
        try {
            changeEmail.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changeEmailError(e));
        }
    };
};

export function fetchSettings(path) {
    return dispatch => {
        let type = 'settings';
        let storeCallbacks = {
            done: successfulSettings,
            error: settingsError
        };
        let url = `budget/settings/${path.split('/')[2]}`;
        let settings = new ApiService(url, null, type);
        dispatch({type: actionTypes.SETTINGS_LAUNCH});
        try {
            settings.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(settingsError(e));
        }
    };
};

export function deleteAccount(password) {
    return dispatch => {
        let data = {password};
        let type = 'delete-account';
        let storeCallbacks = {
            error: deleteAccountError,
            done: successfulDeleteAccount,
        };
        let url = 'budget/settings/delete-account';
        dispatch({type: actionTypes.DELETE_ACCOUNT_LAUNCH});
        let deleteAccount = new ApiService(url, data, type);
        try {
            deleteAccount.delete(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(deleteAccountError(e));
        }
    };
};

export function settingsResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.SETTINGS_RESET});
};

export function changePassword(password, newPassword, confirmPassword) {
    return dispatch => {
        let type = 'change-password';
        let storeCallbacks = {
            error: changePasswordError,
            done: successfulChangePassword,
        };
        let url = 'budget/settings/change-password';
        dispatch({type: actionTypes.CHANGE_PASSWORD_LAUNCH});
        let data = {password, newPassword, confirmPassword};
        let changePassword = new ApiService(url, data, type);
        try {
            changePassword.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changePasswordError(e));
        }
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