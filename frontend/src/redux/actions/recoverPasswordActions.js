import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/recoverPasswordConstants';


export function fetchRecoverPassword(email) {
    return dispatch => {
        let data = {email};
        let type = 'recover';
        let url = 'auth/recover-password';
        let storeCallbacks = {
            error: recoverPasswordFail,
            done: recoverPasswordSuccess,
        };
        let recover = new ApiService(url, data, type);
        dispatch({type: actionTypes.RECOVER_PASSWORD_START});
        try {

            recover.post(storeCallbacks, dispatch);
        } catch (e) {
            dispatch(recoverPasswordFail(e));
        }
    };
}

export function passwordRecoveryStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.RECOVER_PASSWORD_RESET});
    };
}


//Helper
function recoverPasswordFail(error) {
    return {
        payload: error,
        type: actionTypes.RECOVER_PASSWORD_FAIL
    };
}

function recoverPasswordSuccess(data) {
    return {
        payload: data,
        type: actionTypes.RECOVER_PASSWORD_SUCCESS
    };
}