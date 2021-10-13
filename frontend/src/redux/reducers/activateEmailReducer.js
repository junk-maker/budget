import * as actionTypes from '../constants/activateEmailConstants';


const initialState = {
    error: null,
    activate: null,
    loading: false
};


export function getActivateEmailReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ACTIVATE_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.ACTIVATE_EMAIL_RESET:
            return {
                ...state,
                error: null,
                activate: null,
                loading: false,
            };
        case actionTypes.ACTIVATE_EMAIL_START:
            return {
                ...state
            };
        case actionTypes.ACTIVATE_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                activate: action.payload
            };
        default:
            return state;
    }
}