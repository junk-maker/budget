import * as actionTypes from '../constants/verifyEmailConstants';


const initialState = {
    error: null,
    verify: null,
    loading: false,
    connect: null,
};


export function getVerifyEmailReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.VERIFY_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.VERIFY_EMAIL_RESET:
            return {
                ...state,
                error: null,
                verify: null,
                connect: null,
                loading: false
            };
        case actionTypes.VERIFY_EMAIL_START:
            return {
                ...state
            };
        case actionTypes.VERIFY_EMAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.VERIFY_EMAIL_CONNECT:
            return {
                ...state,
                loading: false,
                connect: action.payload
            };
        case actionTypes.VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                verify: action.payload
            };
        default:
            return state;
    }
}