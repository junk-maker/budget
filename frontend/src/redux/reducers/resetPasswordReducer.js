import * as actionTypes from '../constants/resetPasswordConstants';


const initialState = {
    error: null,
    loading: false,
    resetPassword: null,
};


export function getResetPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RESET_PASSWORD_FAIL:
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
                resetPassword: null,
            };
        case actionTypes.RESET_PASSWORD_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                resetPassword: action.payload,
            };
        default:
            return state;
    }
}
