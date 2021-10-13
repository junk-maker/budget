import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/statisticConstants';


export function fetchStatistic() {
    return dispatch => {
        let type = 'statistic';
        let url = 'budget/statistic';
        let store = {
            error: fetchStatisticFail,
            done: fetchStatisticSuccess,
        };
        let statistic = new ApiService(url, null, type);
        dispatch({type: actionTypes.FETCH_STATISTIC_REQUEST});
        try {
            statistic.get(store, dispatch);
        } catch (e) {
            return dispatch(fetchStatisticFail(e));
        }
    };
}

export function statisticResetStateHandler() {
    return dispatch => {
        dispatch({type: actionTypes.FETCH_STATISTIC_RESET});
    };
}


//Helpers
function fetchStatisticFail(error) {
    return {
        payload: error,
        type: actionTypes.FETCH_STATISTIC_FAIL
    };
}

function fetchStatisticSuccess(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.FETCH_STATISTIC_SUCCESS
    };
}