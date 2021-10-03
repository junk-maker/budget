import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/authConstants';


export function fetchLogin(router, email, password) {
    return dispatch => {
        let type = 'auth';
        let url = 'auth/sign-in';
        let storeCallbacks = {
            router: router,
            error: authFail,
            done: authSuccess,
        };
        let data = {email, password};
        dispatch({type: actionTypes.AUTH_START});
        let login = new ApiService(url, data, type);

        try {
            login.post(storeCallbacks, dispatch)
        } catch (e) {
            return dispatch(authFail(e));
        }
    };
}

export function fetchRegister(router, name, email, password) {
    return dispatch => {
        let type = 'auth';
        let storeCallbacks = {
            router: router,
            error: authFail,
            done: authSuccess,
        };
        let url = 'auth/sign-up';
        let data = {name, email, password};
        dispatch({type: actionTypes.AUTH_START});
        let register = new ApiService(url, data, type);

        try {
            register.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(authFail(e));
        }
    };
}

export function authResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.AUTH_RESET});
    };
}


//Helpers
function authSuccess(token) {
    return {
        token,
        type: actionTypes.AUTH_SUCCESS
    };
}

function authFail(error) {
    return {
        payload: error,
        type: actionTypes.AUTH_FAIL,
    };
}