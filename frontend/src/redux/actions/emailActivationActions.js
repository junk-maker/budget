import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForEmailActivation';


export function fetchEmailActivation(token) {
    return dispatch => {
        let type = 'email-activation';
        let storeCallbacks = {
            error: emailActivationError,
            done: successfulEmailActivation,
        };
        let url = `auth/email-activation/${token}`;
        dispatch({type: actionTypes.ACTIVATE_EMAIL_LAUNCH});
        let activate = new ApiService(url, null, type);
        try {
            activate.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(emailActivationError(e));
        }
    };
};

export function activationResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.ACTIVATE_EMAIL_RESET});
};


//Helpers
function emailActivationError(error) {
    return {
        payload: error,
        type: actionTypes.EMAIL_ACTIVATION_ERROR
    };
};

function successfulEmailActivation(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_EMAIL_ACTIVATION
    };
};