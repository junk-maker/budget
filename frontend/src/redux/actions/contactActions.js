import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForContact';


export function fetchContact() {
    return dispatch => {
        let storeCallbacks = {
            error: contactError,
            done: successfulContact,
        };
        dispatch({type: actionTypes.CONTACT_LAUNCH});
        let fetchContact = new ApiService('budget/contact', null, 'contact');
        try {
            fetchContact.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(contactError(e));
        };
    };
};

export function contactResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.CONTACT_RESET});
};

export function sendingMessage(name, email, message) {
    return dispatch => {
        let storeCallbacks = {
            error: sendingErrorMessage,
            done: successfulSendingMessage,
        };
        let sendingMessage = new ApiService('budget/contact', {name, email, message}, 'message');
        dispatch({type: actionTypes.SENDING_MESSAGE_LAUNCH});
        try {
            sendingMessage.post(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(sendingErrorMessage(e));
        };
    };
};


//Helpers
function contactError(error) {
    return {
        payload: error,
        type: actionTypes.CONTACT_ERROR
    };
};

function successfulContact(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_CONTACT
    };
};

function sendingErrorMessage(error) {
    return {
        payload: error,
        type: actionTypes.SENDING_ERROR_MESSAGE
    };
};

function successfulSendingMessage(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_SENDING_MESSAGE
    };
};