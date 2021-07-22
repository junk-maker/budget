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
        let storeCallbacks = {
            error: changeEmailFail,
            done: changeEmailSuccess,
        };
        let appService = new AppService();
        let url = 'budget/settings/change-email';
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
        let type = 'settings-password';
        let storeCallbacks = {
            error: changePasswordFail,
            done: changePasswordSuccess,
        };
        let appService = new AppService();
        let url = 'budget/settings/change-password';
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
        let type = 'settings-delete';
        let storeCallbacks = {
            error: deleteAccountFail,
            done: deleteAccountSuccess,
        };
        let appService = new AppService();
        let url = 'budget/settings/delete-account';
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