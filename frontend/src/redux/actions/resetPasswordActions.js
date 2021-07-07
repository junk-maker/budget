import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/resetPasswordConstants';


export function fetchResetPassword(password, confirmPassword, resetToken, callback,) {
    return dispatch => {
        let type = 'reset';
        let appService = new AppService();
        let data = {password, confirmPassword};
        let url = `auth/reset-password/${resetToken}`;
        let reset = new ApiService(url, data, type);
        let storeCallbacks = {
            error: resetPasswordFail,
            done: resetPasswordSuccess,
        };

        try {
            dispatch(resetPasswordStart());
            reset.put(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            dispatch(resetPasswordFail(e));
        }
    };
}

export function resetPasswordReset() {
    return dispatch => {
        dispatch(resetPasswordState());
    };
}


//Helper
function resetPasswordStart() {
    return {
        type: actionTypes.RESET_PASSWORD_START
    };
}

function resetPasswordState() {
    return {
        type: actionTypes.RESET_PASSWORD_RESET
    };
}

function resetPasswordFail(error) {
    return {
        payload: error,
        type: actionTypes.RESET_PASSWORD_FAIL,
    };
}

function resetPasswordSuccess(reset) {
    return {
        payload: reset,
        type: actionTypes.RESET_PASSWORD_SUCCESS
    };
}