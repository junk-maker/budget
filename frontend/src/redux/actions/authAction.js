import ApiService from '../../services/apiService';
import {AppService} from '../../services/appService';
import * as actionTypes from '../constants/authConstants';


export function fetchLogin(router, email, callback,  password) {
    return dispatch => {
        let url = 'auth/sign-in';
        let data = {email, password};
        let store = {
            done: authSuccess,
            error: authFail
        };
        let service = AppService;
        let login = new ApiService(url, data);

        try {
            dispatch(authStart());
            login.post(store, router, service, dispatch, callback)
        } catch (e) {
            return dispatch(authFail(e));
        }
    };
}

export function fetchRegister(router, name, email, callback, password) {
    return dispatch => {
        let url = 'auth/sign-up';
        let store = {
            done: authSuccess,
            error: authFail
        };
        let service = AppService;
        let data = {name, email, password};
        let register = new ApiService(url, data);

        try {
            dispatch(authStart());
            register.post(store, router, service, dispatch, callback);
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

export function logout(router) {
    return dispatch => {
        dispatch(authLogout());
        router.push('/sign-in');
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

function authLogout() {
    return {
        type: actionTypes.AUTH_LOGOUT
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