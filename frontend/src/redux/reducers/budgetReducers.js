import * as actionTypes from '../constants/budgetConstants';

// const initialState = {
//     budget: {},
//     error: null,
//     loading: false
// }

// export function budgetReducer(state = {income: []}, action) {
//     switch(action.type) {
//         case actionTypes.FETCH_BUDGET_REQUEST:
//             return {
//                 loading: true,
//             };
//         case actionTypes.FETCH_BUDGET_SUCCESS:
//             return {
//                 loading: false,
//                 budget: action.payload
//             };
//         case actionTypes.FETCH_BUDGET_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;    
//     }
// };



export function getBudgetReducer(state, action) {
    if (state === undefined) {
        return {
            type: true,
            income: [],
            expenses: [],
            error: null,
            loading: true,
        };
    }

    switch(action.type) {
        case actionTypes.FETCH_BUDGET_REQUEST:
            return {
                type: true,
                income: [],
                expenses: [],
                error: null,
                loading: true,
            };
        case actionTypes.FETCH_BUDGET_SUCCESS:
            return {
                type: true,
                error: null,
                loading: false,
                income: action.income,
                expenses: action.expenses
            };
        case actionTypes.FETCH_BUDGET_FAIL:
            return {
                type: true,
                income: [],
                expenses: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;    
    }
}