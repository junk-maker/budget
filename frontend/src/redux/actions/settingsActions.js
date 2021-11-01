import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/settingsConstants';


export function changeEmail(email) {
    return dispatch => {
        let data = {email};
        let type = 'settings-email';
        let storeCallbacks = {
            error: changeEmailFail,
            done: changeEmailSuccess,
        };
        let url = 'budget/settings/change-email';
        dispatch({type: actionTypes.CHANGE_EMAIL_START});
        let changeEmail = new ApiService(url, data, type);
        try {
            changeEmail.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changeEmailFail(e));
        }
    };
}

export function fetchSettings(path) {
    return dispatch => {
        let type = 'settings';
        let storeCallbacks = {
            done: fetchSettingsSuccess,
            error: fetchSettingsFail
        };
        let url = `budget/settings/${path.split('/')[2]}`;
        let settings = new ApiService(url, null, type);
        dispatch({type: actionTypes.FETCH_SETTINGS_REQUEST});
        try {
            settings.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(fetchSettingsFail(e));
        }
    };
}

export function deleteAccount(password) {
    return dispatch => {
        let data = {password};
        let type = 'settings-delete';
        let storeCallbacks = {
            error: deleteAccountFail,
            done: deleteAccountSuccess,
        };
        let url = 'budget/settings/delete-account';
        dispatch({type: actionTypes.DELETE_ACCOUNT_START});
        let deleteAccount = new ApiService(url, data, type);
        try {
            deleteAccount.delete(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(deleteAccountFail(e));
        }
    };
}

export function settingsResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_SETTINGS_RESET});
    };
}

export function changePassword(password, newPassword, confirmPassword) {
    return dispatch => {
        let type = 'settings-password';
        let storeCallbacks = {
            error: changePasswordFail,
            done: changePasswordSuccess,
        };
        let url = 'budget/settings/change-password';
        dispatch({type: actionTypes.CHANGE_PASSWORD_START});
        let data = {password, newPassword, confirmPassword};
        let changePassword = new ApiService(url, data, type);
        try {
            changePassword.put(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(changePasswordFail(e));
        }
    };
}


//Helpers
function changeEmailFail(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_EMAIL_FAIL
    };
}

function fetchSettingsFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_SETTINGS_FAIL
    };
}

function deleteAccountFail(error) {
    return {
        payload: error,
        type: actionTypes.DELETE_ACCOUNT_FAIL
    };
}

function changePasswordFail(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_PASSWORD_FAIL
    };
}

function changeEmailSuccess(data) {
    return {
        payload: data,
        type: actionTypes.CHANGE_EMAIL_SUCCESS
    };
}

function fetchSettingsSuccess(data) {
    return {
        payload: data,
        type: actionTypes.FETCH_SETTINGS_SUCCESS
    };
}

function deleteAccountSuccess(data) {
    return {
        payload: data,
        type: actionTypes.DELETE_ACCOUNT_SUCCESS
    };
}

function changePasswordSuccess(data) {
    return {
        payload: data,
        type: actionTypes.CHANGE_PASSWORD_SUCCESS
    };
}