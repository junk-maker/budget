import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForVerifyEmail';


export function dataVerification(token) {
    return dispatch => {
        let data = {token};
        let type = 'verify-email';
        let storeCallbacks = {
            error: verifyEmailError,
            done: successfulVerifyEmail,
        };
        let url = `auth/verify-email/${token}`;
        let verify = new ApiService(url, data, type);
        dispatch({type: actionTypes.REQUEST_VERIFY_EMAIL});
        try {
            verify.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(verifyEmailError(e));
        }
    };
};

export function fetchVerify(token) {
    return dispatch => {
        let type = 'verify-email';
        let storeCallbacks = {
            error: verifyEmailError,
            done: emailVerificationConnection,
        };
        let url = `auth/verify-email/${token}`;
        dispatch({type: actionTypes.LOUNCH_VERIFY_EMAIL});
        let verify = new ApiService(url, null, type);
        try {
            verify.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(verifyEmailError(e));
        }
    };
};

export function resetEmailVerificationStateHandler() {
    return dispatch => dispatch({type: actionTypes.RESET_VERIFY_EMAIL});
};


//Helpers
function verifyEmailError(error) {
    return {
        payload: error,
        type: actionTypes.VERIFY_EMAIL_ERROR
    };
};

function successfulVerifyEmail(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_VERIFY_EMAIL
    };
};

function emailVerificationConnection(data) {
    return {
        payload: data,
        type: actionTypes.EMAIL_VERIFICATION_CONNECTION
    };
};