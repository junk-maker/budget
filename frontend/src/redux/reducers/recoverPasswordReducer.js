import * as actionTypes from '../constants/recoverPasswordConstants';

const initialState = {
    error: null,
    email: null,
    loading: false,
};


export function getRecoverPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.RECOVER_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.RECOVER_PASSWORD_RESET:
            return {
                ...state,
                email: null,
                error: null,
                loading: false,
            };
        case actionTypes.RECOVER_PASSWORD_START:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.RECOVER_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                email: action.payload,
            };
        default:
            return state;
    }
}