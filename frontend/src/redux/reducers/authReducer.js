import * as actionTypes from '../constants/authConstants';
import StorageService from '../../services/storageService';

const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    register: null,
    token: storageService.getItem('authToken')
};


export function getAuthReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                register: null,
            };
        case actionTypes.LOGIN_SUCCESS:
            storageService.setItem('authToken', action.payload);
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                register: action.payload
            };
        default:
            return state;
    }
}