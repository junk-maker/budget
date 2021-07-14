import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/featuresConstants';


export function fetchFeatures(callback) {
    return dispatch => {
        let type = 'features';
        let url = 'budget/features';
        let appService = new AppService();
        let storeCallbacks = {
            done: fetchFeaturesSuccess,
            error: fetchFeaturesFail
        };
        let features = new ApiService(url, null, type);

        try {
            dispatch(fetchFeaturesRequest());
            features.get(storeCallbacks, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchFeaturesFail(e));
        }
    };
}

export function featuresReset() {
    return dispatch => {
        dispatch(featuresResetState());
    };
}


//Helpers
function fetchFeaturesFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_FEATURES_FAIL
    };
}

function featuresResetState() {
    return {
        type: actionTypes.FETCH_FEATURES_RESET
    };
}

function fetchFeaturesRequest() {
    return {
        type: actionTypes.FETCH_FEATURES_REQUEST
    };
}

function fetchFeaturesSuccess(features) {
    return {
        payload: features,
        type: actionTypes.FETCH_FEATURES_SUCCESS
    };
}
