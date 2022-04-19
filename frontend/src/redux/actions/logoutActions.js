import * as actionTypes from '../constants/constantsForLogout';


export function logout() {return dispatch => dispatch({type: actionTypes.APP_LOGOUT});};