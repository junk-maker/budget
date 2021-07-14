import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/settingsConstants';


export function fetchSettings(callback) {
    return dispatch => {
        let type = 'settings';
        let url = 'budget/settings';
        let appService = new AppService();
        let storeCallbacks = {
            done: fetchSettingsSuccess,
            error: fetchSettingsFail
        };
        let settings = new ApiService(url, null, type);

        try {
            dispatch(fetchSettingsRequest());
            settings.get(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchSettingsFail(e));
        }
    };
}

export function changeEmail(email, callback) {
    return dispatch => {
        let data = {email};
        let type = 'settings-email';
        let url = 'budget/settings';
        let storeCallbacks = {
            done: changeEmailSuccess,
            error: changeEmailFail
        };
        let appService = new AppService();
        let changeEmail = new ApiService(url, data, type);

        try {
            dispatch(changeEmailStart());
            changeEmail.put(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(changeEmailFail(e));
        }
    };
}

export function changePassword(password, newPassword, confirmPassword, callback) {
    return dispatch => {
        let url = 'budget/settings';
        let type = 'settings-password';
        let storeCallbacks = {
            done: changePasswordSuccess,
            error: changePasswordFail
        };
        let appService = new AppService();
        let data = {password, newPassword, confirmPassword};
        let changePassword = new ApiService(url, data, type);

        try {
            dispatch(changePasswordStart());
            changePassword.put(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(changePasswordFail(e));
        }
    };
}

export function deleteAccount(password, callback) {
    return dispatch => {
        let data = {password};
        let url = 'budget/settings';
        let type = 'settings-delete';
        let storeCallbacks = {
            done: deleteAccountSuccess,
            error: deleteAccountFail
        };
        let appService = new AppService();
        let deleteAccount = new ApiService(url, data, type);

        try {
            dispatch(deleteAccountStart());
            deleteAccount.delete(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(deleteAccountFail(e));
        }
    };
}

export function settingsReset() {
    return dispatch => {
        dispatch(settingsResetState());
    };
}


//Helpers
function changeEmailFail(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_EMAIL_FAIL
    };
}

function changeEmailStart() {
    return {
        type: actionTypes.CHANGE_EMAIL_START
    };
}
function deleteAccountFail(error) {
    return {
        payload: error,
        type: actionTypes.DELETE_ACCOUNT_FAIL
    };
}

function deleteAccountStart() {
    return {
        type: actionTypes.DELETE_ACCOUNT_START
    };
}

function changePasswordFail(error) {
    return {
        payload: error,
        type: actionTypes.CHANGE_PASSWORD_FAIL
    };
}

function changeEmailSuccess(email) {
    return {
        payload: email,
        type: actionTypes.CHANGE_EMAIL_SUCCESS
    };
}

function changePasswordStart() {
    return {
        type: actionTypes.CHANGE_PASSWORD_START
    };
}

function deleteAccountSuccess(account) {
    return {
        payload: account,
        type: actionTypes.DELETE_ACCOUNT_SUCCESS
    };
}

function changePasswordSuccess(password) {
    return {
        payload: password,
        type: actionTypes.CHANGE_PASSWORD_SUCCESS
    };
}

function fetchSettingsFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_SETTINGS_FAIL
    };
}

function settingsResetState() {
    return {
        type: actionTypes.FETCH_SETTINGS_RESET
    };
}

function fetchSettingsRequest() {
    return {
        type: actionTypes.FETCH_SETTINGS_REQUEST
    };
}

function fetchSettingsSuccess(settings) {
    return {
        payload: settings,
        type: actionTypes.FETCH_SETTINGS_SUCCESS
    };
}