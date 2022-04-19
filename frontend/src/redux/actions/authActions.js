import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForAuth';


export function fetchLogin(router, email, password) {
    return dispatch => {
        let type = 'login';
        let url = 'auth/sign-in';
        let storeCallbacks = {
            router: router,
            error: authError,
            done: successfulLogin,
        };
        let data = {email, password};
        dispatch({type: actionTypes.AUTH_LAUNCH});
        let login = new ApiService(url, data, type);
        try {
            login.post(storeCallbacks, dispatch)
        } catch (e) {
            return dispatch(authError(e));
        }
    };
};

export function fetchRegister(router, name, email, password) {
    return dispatch => {
        let type = 'register';
        let storeCallbacks = {
            router: router,
            error: authError,
            done: successfulRegister,
        };
        let url = 'auth/sign-up';
        let data = {name, email, password};
        dispatch({type: actionTypes.AUTH_LAUNCH});
        let register = new ApiService(url, data, type);
        try {
            register.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(authError(e));
        }
    };
};

export function authResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.AUTH_RESET});
};


//Helpers
function authError(error) {
    return {
        payload: error,
        type: actionTypes.AUTH_ERROR
    };
};

function successfulLogin(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_LOGIN
    };
};

function successfulRegister(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_REGISTER
    };
};
