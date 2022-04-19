import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForPasswordReset';


export function passwordResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.RESET_PASSWORD_RESET});
};

export function fetchPasswordReset(password, confirmPassword, resetToken) {
    return dispatch => {
        let type = 'password-reset';
        let data = {password, confirmPassword};
        let url = `auth/password-reset/${resetToken}`;
        let storeCallbacks = {
            error: passwordResetError,
            done: SuccessfulPasswordReset,
        };
        let reset = new ApiService(url, data, type);
        dispatch({type: actionTypes.PASSWORD_RESET_LAUNCH});
        try {
            reset.put(storeCallbacks, dispatch);
        } catch (e) {
            dispatch(passwordResetError(e));
        }
    };
};


//Helper
function passwordResetError(error) {
    return {
        payload: error,
        type: actionTypes.PASSWORD_RESET_ERROR,
    };
};

function SuccessfulPasswordReset(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_PASSWORD_RESET
    };
};