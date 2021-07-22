import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/recoverPasswordConstants';


export function fetchRecoverPassword(email, callback) {
    return dispatch => {
        let data = {email};
        let type = 'recover';
        let appService = new AppService();
        let url = 'auth/recover-password';
        let recover = new ApiService(url, data, type);
        let storeCallbacks = {
            error: recoverPasswordFail,
            done: recoverPasswordSuccess,
        };

        try {
            dispatch(recoverPasswordStart());
            recover.post(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            dispatch(recoverPasswordFail(e));
        }
    };
}

export function recoverPasswordReset() {
    return dispatch => {
        dispatch(recoverPasswordState());
    };
}


//Helper
function recoverPasswordStart() {
    return {
        type: actionTypes.RECOVER_PASSWORD_START
    };
}

function recoverPasswordState() {
    return {
        type: actionTypes.RECOVER_PASSWORD_RESET
    };
}

function recoverPasswordFail(error) {
    return {
        payload: error,
        type: actionTypes.RECOVER_PASSWORD_FAIL,
    };
}

function recoverPasswordSuccess(email) {
    return {
        payload: email,
        type: actionTypes.RECOVER_PASSWORD_SUCCESS
    };
}