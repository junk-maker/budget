import * as actionTypes from '../constants/featuresConstants';


const initialState = {
    error: null,
    loading: false,
    features: null,
};


export function getFeaturesReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_FEATURES_RESET:
            return {
                ...state,
                error: null,
                loading: false
            };
        case actionTypes.FETCH_FEATURES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.FETCH_FEATURES_REQUEST:
            return {
                ...state,
            };
        case actionTypes.FETCH_FEATURES_SUCCESS:
            return {
                ...state,
                loading: false,
                features: action.payload
            };
        default:
            return state;
    }
}