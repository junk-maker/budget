import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/contactConstants';


export function fetchContact(callback) {
    return dispatch => {
        let type = 'message';
        let url = 'budget/contact';
        let storeCallbacks = {
            error: fetchContactFail,
            done: fetchContactSuccess,
        };
        let appService = new AppService();
        let fetchMessage = new ApiService(url, null, type);

        try {
            dispatch(fetchContactRequest());
            fetchMessage.get(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchContactFail(e));
        }
    };
}

export function sendMessage(name, email, message, callback) {
    return dispatch => {
        const type = 'message';
        let url = 'budget/contact';
        let storeCallbacks = {
            error: sendMessageFail,
            done: sendMessageSuccess,
        };
        let data = {name, email, message};
        let appService = new AppService();
        let contact = new ApiService(url, data, type);

        try {
            dispatch(sendMessageRequest());
            contact.post(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(sendMessageFail(e));
        }
    };
}

export function contactReset() {
    return dispatch => {
        dispatch(contactResetState());
    };
}


//Helpers
function contactResetState() {
    return {
        type: actionTypes.FETCH_CONTACT_RESET
    };
}

function sendMessageRequest() {
    return {
        type: actionTypes.SEND_MESSAGE_REQUEST
    };
}

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

function fetchContactRequest() {
    return {
        type: actionTypes.FETCH_CONTACT_REQUEST
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