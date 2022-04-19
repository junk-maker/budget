import StorageService from '../../services/storageService';
import * as actionTypes from '../constants/constantsForFeatures';

const storageService = new StorageService(localStorage);

const initialState = {
    error: null,
    loading: false,
    features: null,
};


export function getFeaturesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FEATURES_RESET:
            return {
                ...state,
                error: null,
                loading: false,
            };
        case actionTypes.FEATURES_ERROR:
            storageService.removeItem('authToken');
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.FEATURES_LAUNCH:
            return {...state,};
        case actionTypes.SUCCESSFUL_FEATURES:
            return {
                ...state,
                loading: false,
                features: action.payload,
            };
        default:
            return state;
    };
};