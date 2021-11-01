import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/verifyEmailConstants';


export function getVerify(token) {
    return dispatch => {
        let data = {token};
        let type = 'verify-email';
        let storeCallbacks = {
            error: verifyEmailFail,
            done: verifyEmailSuccess,
        };
        let url = `auth/verify-email/${token}`;
        let verify = new ApiService(url, data, type);
        dispatch({type: actionTypes.VERIFY_EMAIL_REQUEST});
        try {
            verify.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(verifyEmailFail(e));
        }
    };
}

export function fetchVerify(token) {
    return dispatch => {
        let type = 'verify-email';
        let storeCallbacks = {
            error: verifyEmailFail,
            done: verifyEmailConnect,
        };
        let url = `auth/verify-email/${token}`;
        dispatch({type: actionTypes.VERIFY_EMAIL_START});
        let verify = new ApiService(url, null, type);
        try {
            verify.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(verifyEmailFail(e));
        }
    };
}

export function resetEmailVerificationStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.VERIFY_EMAIL_RESET});
    };
}


//Helpers
function verifyEmailFail(error) {
    return {
        payload: error,
        type: actionTypes.VERIFY_EMAIL_FAIL
    };
}

function verifyEmailConnect(data) {
    return {
        payload: data,
        type: actionTypes.VERIFY_EMAIL_CONNECT
    };
}

function verifyEmailSuccess(data) {
    return {
        payload: data,
        type: actionTypes.VERIFY_EMAIL_SUCCESS
    };
}