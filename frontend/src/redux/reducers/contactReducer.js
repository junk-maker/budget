import * as actionTypes from '../constants/contactConstants';


const initialState = {
    error: null,
    message: null,
    contact: null,
    loading: false,
};


export function getContactReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case actionTypes.FETCH_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_CONTACT_RESET:
            return {
                ...state,
                error: null,
                message: null,
                loading: false
            };
        case actionTypes.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case actionTypes.FETCH_CONTACT_REQUEST:
            return {
                ...state
            };
        case actionTypes.FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                contact: action.payload
            };
        default:
            return state;
    }
}