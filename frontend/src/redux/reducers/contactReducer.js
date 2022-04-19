import * as actionTypes from '../constants/constantsForContact';


const initialState = {
    error: null,
    message: null,
    contact: null,
    loading: false,
};


export function getContactReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CONTACT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.CONTACT_RESET:
            return {
                ...state,
                error: null,
                message: null,
                loading: false,
            };
        case actionTypes.CONTACT_LAUNCH:
            return {...state,};
        case actionTypes.SUCCESSFUL_CONTACT:
            return {
                ...state,
                loading: false,
                contact: action.payload,
            };
        case actionTypes.SENDING_ERROR_MESSAGE:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actionTypes.SENDING_MESSAGE_LAUNCH:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.SUCCESSFUL_SENDING_MESSAGE:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        default:
            return state;
    };
};