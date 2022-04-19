import * as actionTypes from '../constants/constantsForSettings';


const initialState = {
    error: null,
    account: null,
    message: null,
    loading: false,
    settings: null,
};


export function getSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SETTINGS_RESET:
            return {
                ...state,
                error: null,
                message: null,
                loading: false,
                settings: null,
            };
        case actionTypes.SETTINGS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.SETTINGS_LAUNCH:
            return {...state,};
        case actionTypes.CHANGE_EMAIL_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actionTypes.CHANGE_EMAIL_LAUNCH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_SETTINGS:
            return {
                ...state,
                loading: false,
                settings: action.payload,
            };
        case actionTypes.DELETE_ACCOUNT_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actionTypes.CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actionTypes.DELETE_ACCOUNT_LAUNCH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.CHANGE_PASSWORD_LAUNCH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_CHANGE_EMAIL:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actionTypes.SUCCESSFUL_DELETE_ACCOUNT:
            return {
                ...state,
                loading: false,
                account: action.payload,
            };
        case actionTypes.SUCCESSFUL_CHANGE_PASSWORD:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        default:
            return state;
    };
};