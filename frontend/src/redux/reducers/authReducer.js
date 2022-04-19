import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/constantsForAuth';

const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    register: null,
    token: storageService.getItem('authToken'),
};


export function getAuthReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.AUTH_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                register: null,
            };
        case actionTypes.SUCCESSFUL_REGISTER:
            return {
                ...state,
                error: null,
                loading: false,
                register: action.payload,
            };
        case actionTypes.SUCCESSFUL_LOGIN:
            storageService.setItem('authToken', action.payload);
            return {
                ...state,
                error: null,
                loading: false,
            };
        default:
            return state;
    };
};