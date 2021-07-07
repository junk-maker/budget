import * as actionTypes from '../constants/logoutConstants';


export function logout(router) {
    return dispatch => {
        dispatch(appLogout());
        router.push('/sign-in');
    };
}


//Helpers
function appLogout() {
    return {
        type: actionTypes.APP_LOGOUT
    };
}