import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForAuth';


export function fetchLogin(router, email, password) {
    return dispatch => {
        let storeCallbacks = {
            router: router,
            error: authError,
            done: successfulLogin,
        };
        dispatch({type: actionTypes.AUTH_LAUNCH});
        let login = new ApiService('auth/sign-in', {email, password}, 'login');
        try {
            login.post(storeCallbacks, dispatch)
        } catch (e) {
            return dispatch(authError(e));
        }
    };
};

export function fetchRegister(router, name, email, password) {
    return dispatch => {
        let storeCallbacks = {
            router: router,
            error: authError,
            done: successfulRegister,
        };
        dispatch({type: actionTypes.AUTH_LAUNCH});
        let register = new ApiService('auth/sign-up', {name, email, password}, 'register');
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
