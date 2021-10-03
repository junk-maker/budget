import * as actionTypes from '../constants/logoutConstants';


export function logout() {
    return dispatch => {
        dispatch({type: actionTypes.APP_LOGOUT});
    };
}