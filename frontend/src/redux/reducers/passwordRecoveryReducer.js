import * as actionTypes from '../constants/constantsForPasswordRecovery';


const initialState = {
    error: null,
    email: null,
    loading: false,
};


export function getPasswordRecoveryReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PASSWORD_RECOVERY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.PASSWORD_RECOVERY_RESET:
            return {
                ...state,
                email: null,
                error: null,
                loading: false,
            };
        case actionTypes.PASSWORD_RECOVERY_LOUNCH:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_PASSWORD_RECOVERY:
            return {
                ...state,
                error: null,
                loading: false,
                email: action.payload,
            };
        default:
            return state;
    };
};