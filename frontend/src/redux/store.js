import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Reducers
import {getBudgetReducer} from './reducers/budgetReducers';

const reducer = combineReducers({
    getBudget: getBudgetReducer
});

const middleware = thunk;


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware))
);

export default store;


