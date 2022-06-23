import ApiService from '../../services/apiService';
import * as actionTypes from '../constants/constantsForStatistics';


export function fetchStatistics(end, start, year, month, currency) {
    return dispatch => {
        let store = {
            error: statisticsError,
            done: successfulStatistics,
        };
        let statistics = new ApiService(`budget/statistics/${end}/${start}/${year}/${month}/${currency.currency}`, null, 'statistics');
        dispatch({type: actionTypes.STATISTICS_LAUNCH});
        try {
            statistics.get(store, dispatch);
        } catch (e) {
            return dispatch(statisticsError(e));
        };
    };
};

export function statisticsResetStateHandler() {
    return dispatch => dispatch({type: actionTypes.STATISTICS_RESET});
};


//Helpers
function statisticsError(error) {
    return {
        payload: error,
        type: actionTypes.STATISTICS_ERROR
    };
};

function successfulStatistics(income, expenses) {
    return {
        income,
        expenses,
        type: actionTypes.SUCCESSFUL_STATISTICS
    };
};