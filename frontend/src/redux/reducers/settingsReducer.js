import * as actionTypes from '../constants/settingsConstants';


const initialState = {
    error: null,
    account: null,
    message: null,
    loading: false,
    settings: null,
};


export function getSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.CHANGE_EMAIL_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case actionTypes.FETCH_SETTINGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_SETTINGS_RESET:
            return {
                ...state,
                error: null,
                message: null,
                loading: false,
                settings: null,
            };
        case actionTypes.DELETE_ACCOUNT_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.CHANGE_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case actionTypes.FETCH_SETTINGS_REQUEST:
            return {
                ...state
            };
        case actionTypes.FETCH_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                settings: action.payload
            };
        case actionTypes.DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                account: action.payload
            };
        case actionTypes.CHANGE_PASSWORD_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        default:
            return state;
    }
}