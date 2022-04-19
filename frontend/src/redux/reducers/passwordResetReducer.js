import * as actionTypes from '../constants/constantsForPasswordReset';


const initialState = {
    error: null,
    loading: false,
    passwordReset: null,
};


export function getPasswordResetReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PASSWORD_RESET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.RESET_PASSWORD_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                passwordReset: null,
            };
        case actionTypes.PASSWORD_RESET_LAUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_PASSWORD_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                passwordReset: action.payload,
            };
        default:
            return state;
    };
};
