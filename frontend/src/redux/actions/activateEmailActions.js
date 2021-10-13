import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/activateEmailConstants';


export function fetchActivate(token) {
    return dispatch => {
        let type = 'activate-email';
        let storeCallbacks = {
            error: activateEmailFail,
            done: activateEmailSuccess,
        };
        let url = `auth/activate-email/${token}`;
        dispatch({type: actionTypes.ACTIVATE_EMAIL_START});
        let activate = new ApiService(url, null, type);
        try {
            activate.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(activateEmailFail(e));
        }
    };
}

export function activationResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.ACTIVATE_EMAIL_RESET});
    };
}


//Helpers
function activateEmailFail(error) {
    return {
        payload: error,
        type: actionTypes.ACTIVATE_EMAIL_FAIL
    };
}

function activateEmailSuccess(data) {
    return {
        payload: data,
        type: actionTypes.ACTIVATE_EMAIL_SUCCESS
    };
}