import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/featuresConstants';


export function fetchFeatures() {
    return dispatch => {
        let type = 'features';
        let url = 'budget/features';
        let storeCallbacks = {
            error: fetchFeaturesFail,
            done: fetchFeaturesSuccess,
        };
        let features = new ApiService(url, null, type);
        dispatch({type: actionTypes.FETCH_FEATURES_REQUEST});

        try {
            features.get(storeCallbacks, dispatch);
        } catch (e) {
            return dispatch(fetchFeaturesFail(e));
        }
    };
}

export function featuresResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_FEATURES_RESET});
    };
}


//Helpers
function fetchFeaturesFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_FEATURES_FAIL
    };
}

function fetchFeaturesSuccess(features) {
    return {
        payload: features,
        type: actionTypes.FETCH_FEATURES_SUCCESS
    };
}
