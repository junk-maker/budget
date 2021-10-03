import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/resetPasswordConstants';


export function fetchResetPassword(password, confirmPassword, resetToken) {
    return dispatch => {
        let type = 'reset';
        let data = {password, confirmPassword};
        let url = `auth/reset-password/${resetToken}`;
        let reset = new ApiService(url, data, type);
        let storeCallbacks = {
            error: resetPasswordFail,
            done: resetPasswordSuccess,
        };
        dispatch({type: actionTypes.RESET_PASSWORD_START});

        try {
            reset.put(storeCallbacks, dispatch);
        } catch (e) {
            dispatch(resetPasswordFail(e));
        }
    };
}

export function resetPasswordResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.RESET_PASSWORD_RESET});
    };
}


//Helper
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