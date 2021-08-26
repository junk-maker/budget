import AppService from '../../services/appService';
import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/statisticConstants';

export function fetchStatistic(callback) {
    return dispatch => {
        let type = 'statistic';
        let url = 'budget/statistic';
        let store = {
            error: fetchStatisticFail,
            done: fetchStatisticSuccess,
        };
        let appService = new AppService();
        let statistic = new ApiService(url, null, type);

        try {
            dispatch(fetchStatisticRequest());
            statistic.get(store, appService, dispatch, callback);
        } catch (e) {
            return dispatch(fetchStatisticFail(e));
        }
    };
}

export function statisticReset() {
    return dispatch => {
        dispatch(statisticResetState());
    };
}


//Helpers
function statisticResetState() {
    return {
        type: actionTypes.FETCH_STATISTIC_RESET
    };
}

function fetchStatisticRequest() {
    return {
        type: actionTypes.FETCH_STATISTIC_REQUEST
    };
}

function fetchStatisticSuccess(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.FETCH_STATISTIC_SUCCESS
    };
}

function fetchStatisticFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_STATISTIC_FAIL
    };
}