import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Reducers
import {getAuthReducer} from './reducers/authReducer';
import {getBudgetReducer} from './reducers/budgetReducer';
import {getContactReducer} from './reducers/contactReducer';
import {getFeaturesReducer} from './reducers/featuresReducer';


const reducer = combineReducers({
    getAuth: getAuthReducer,
    getBudget: getBudgetReducer,
    getContact: getContactReducer,
    getFeatures: getFeaturesReducer,

});

const middleware = thunk;


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware))
);

export default store;


