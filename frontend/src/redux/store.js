import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Reducers
import {getAuthReducer} from './reducers/authReducers';
import {getBudgetReducer} from './reducers/budgetReducers';


const reducer = combineReducers({
    getAuth: getAuthReducer,
    getBudget: getBudgetReducer,
});

const middleware = thunk;


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware))
);

export default store;


