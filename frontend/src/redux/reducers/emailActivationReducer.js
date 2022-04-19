import * as actionTypes from '../constants/constantsForEmailActivation';


const initialState = {
    error: null,
    loading: false,
    activation: null,
};


export function getAnEmailActivationReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.EMAIL_ACTIVATION_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.ACTIVATE_EMAIL_RESET:
            return {
                ...state,
                error: null,
                loading: false,
                activation: null,
            };
        case actionTypes.ACTIVATE_EMAIL_LAUNCH:
            return {...state};
        case actionTypes.SUCCESSFUL_EMAIL_ACTIVATION:
            return {
                ...state,
                loading: false,
                activation: action.payload,
            };
        default:
            return state;
    };
};