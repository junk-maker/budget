import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/authConstants';


export function fetchLogin(router, email, callback,  password) {
    return dispatch => {
        let type = 'auth';
        let url = 'auth/sign-in';
        let storeCallbacks = {
            router: router,
            error: authFail,
            done: authSuccess,
        };
        let data = {email, password};
        let login = new ApiService(url, data, type);

        try {
            dispatch(authStart());
            login.post(storeCallbacks, dispatch, callback)
        } catch (e) {
            return dispatch(authFail(e));
        }
    };
}

export function fetchRegister(router, name, email, callback, password) {
    return dispatch => {
        let type = 'auth';
        let storeCallbacks = {
            router: router,
            error: authFail,
            done: authSuccess,
        };
        let url = 'auth/sign-up';
        let data = {name, email, password};
        let register = new ApiService(url, data, type);

        try {
            dispatch(authStart());
            register.post(storeCallbacks, dispatch, callback);
        } catch (e) {
            return dispatch(authFail(e));
        }
    };
}

export function authReset() {
    return dispatch => {
        dispatch(authResetState());
    };
}


//Helpers
function authStart() {
    return {
        type: actionTypes.AUTH_START
    };
}

function authResetState() {
    return {
        type: actionTypes.AUTH_RESET
    };
}

function authSuccess(id, token) {
    return {
        id,
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