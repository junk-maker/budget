import * as actionTypes from '../constants/authConstants';

const initialState = {
    error: null,
    user_id: null,
    loading: false,
    token: localStorage.getItem('authToken')
};


export function getAuthReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,

            };
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.AUTH_RESET:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem('authToken');
            // localStorage.clear();
            return {
                ...state,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_SUCCESS:
            localStorage.setItem('authToken', action.token);
            return {
                ...state,
                error: null,
                loading: false,
                user_id: action.id,
                token: action.token,
            };
        default:
            return state;
    }
}