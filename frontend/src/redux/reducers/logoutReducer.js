import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/logoutConstants';

const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    user_id: null,
    loading: false,
    token: storageService.getItem('authToken')
};


export function getLogoutReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.APP_LOGOUT:
            storageService.removeItem('authToken');
            return {
                ...state,
                error: null,
                loading: false
            };
        default:
            return state;
    }
}