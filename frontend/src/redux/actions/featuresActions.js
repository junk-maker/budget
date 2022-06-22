import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForFeatures';


export function fetchFeatures() {
    return dispatch => {
        let storeCallbacks = {
            error: featuresError,
            done: successfulFeatures,
        };
        let features = new ApiService('budget/features', null, 'features');
        dispatch({type: actionTypes.FEATURES_LAUNCH});
        try {
            features.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(featuresError(e));
        };
    };
};

export function featuresResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.FEATURES_RESET});
};


//Helpers
function featuresError(error) {
    return {
        payload: error,
        type: actionTypes.FEATURES_ERROR
    };
};

function successfulFeatures(data) {
    return {
        payload: data,
        type: actionTypes.SUCCESSFUL_FEATURES
    };
};
