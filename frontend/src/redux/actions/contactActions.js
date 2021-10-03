import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/contactConstants';


export function fetchContact() {
    return dispatch => {
        let type = 'message';
        let url = 'budget/contact';
        let storeCallbacks = {
            error: fetchContactFail,
            done: fetchContactSuccess,
        };
        dispatch({type: actionTypes.FETCH_CONTACT_REQUEST});
        let fetchMessage = new ApiService(url, null, type);

        try {
            fetchMessage.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(fetchContactFail(e));
        }
    };
}

export function sendMessage(name, email, message) {
    return dispatch => {
        let type = 'message';
        let url = 'budget/contact';
        let storeCallbacks = {
            error: sendMessageFail,
            done: sendMessageSuccess,
        };
        let data = {name, email, message};
        let contact = new ApiService(url, data, type);
        dispatch({type: actionTypes.SEND_MESSAGE_REQUEST});
        try {
            contact.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(sendMessageFail(e));
        }
    };
}

export function contactResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_CONTACT_RESET});
    };
}


//Helpers
function sendMessageSuccess(message) {
    return {
        payload: message,
        type: actionTypes.SEND_MESSAGE_SUCCESS
    };
}

function sendMessageFail(error) {
    return {
        payload: error,
        type: actionTypes.SEND_MESSAGE_FAIL
    };
}

function fetchContactSuccess(contact) {
    return {
        payload: contact,
        type: actionTypes.FETCH_CONTACT_SUCCESS
    };
}

function fetchContactFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_CONTACT_FAIL
    };
}