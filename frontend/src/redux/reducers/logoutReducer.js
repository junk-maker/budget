import * as actionTypes from '../constants/logoutConstants';


const initialState = {
    error: null,
    user_id: null,
    loading: false,
    token: localStorage.getItem('authToken')
};


export function getLogoutReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.APP_LOGOUT:
            localStorage.removeItem('authToken');
            return {
                ...state,
                error: null,
                loading: false,
            };
        default:
            return state;
    }
}