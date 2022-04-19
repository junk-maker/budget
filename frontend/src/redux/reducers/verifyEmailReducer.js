import * as actionTypes from '../constants/constantsForVerifyEmail';


const initialState = {
    error: null,
    loading: false,
    connection: null,
    verification: null,
};


export function getVerifyEmailReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.VERIFY_EMAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.RESET_VERIFY_EMAIL:
            return {
                ...state,
                error: null,
                loading: false,
                connection: null,
                verification: null,
            };
        case actionTypes.LOUNCH_VERIFY_EMAIL:
            return {...state,};
        case actionTypes.REQUEST_VERIFY_EMAIL:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_VERIFY_EMAIL:
            return {
                ...state,
                loading: false,
                verification: action.payload,
            };
        case actionTypes.EMAIL_VERIFICATION_CONNECTION:
            return {
                ...state,
                loading: false,
                connection: action.payload,
            };
        default:
            return state;
    };
};