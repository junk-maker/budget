import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForPasswordRecovery';


export function fetchPasswordRecovery (email) {
    return dispatch => {
        let storeCallbacks = {
            error: passwordRecoveryError,
            done: successfulPasswordRecovery,
        };
        let recover = new ApiService('auth/password-recovery', {email}, 'password-recovery');
        dispatch({type: actionTypes.PASSWORD_RECOVERY_LOUNCH});
        try {

            recover.post(storeCallbacks, dispatch);
        } catch (e) {
            dispatch(passwordRecoveryError(e));
        };
    };
};

export function passwordRecoveryStateHandler() {
    return dispatch => dispatch({type: actionTypes.PASSWORD_RECOVERY_RESET});
};


//Helper
function passwordRecoveryError(error) {
    return {
        payload: error,
        type: actionTypes.PASSWORD_RECOVERY_ERROR
    };
};

function successfulPasswordRecovery(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_PASSWORD_RECOVERY
    };
};