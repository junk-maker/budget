import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/constantsForLogout';

const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    token: storageService.getItem('authToken'),
};


export function getLogoutReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.APP_LOGOUT:
            storageService.removeItem('authToken');
            return {...state,};
        default:
            return state;
    };
};