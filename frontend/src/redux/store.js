import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, combineReducers, applyMiddleware} from 'redux';

// Reducers
import {getAuthReducer} from './reducers/authReducer';
import {getLogoutReducer} from './reducers/logoutReducer';
import {getBudgetReducer} from './reducers/budgetReducer';
import {getContactReducer} from './reducers/contactReducer';
import {getFeaturesReducer} from './reducers/featuresReducer';
import {getSettingsReducer} from './reducers/settingsReducer';
import {getStatisticReducer} from './reducers/statisticReducer';
import {getVerifyEmailReducer} from './reducers/verifyEmailReducer';
import {getActivateEmailReducer} from './reducers/activateEmailReducer';
import {getResetPasswordReducer} from './reducers/resetPasswordReducer';
import {getRecoverPasswordReducer} from './reducers/recoverPasswordReducer';


const reducer = combineReducers({
    getAuth: getAuthReducer,
    getLogout: getLogoutReducer,
    getBudget: getBudgetReducer,
    getContact: getContactReducer,
    getFeatures: getFeaturesReducer,
    getSettings: getSettingsReducer,
    getVerify: getVerifyEmailReducer,
    getStatistic: getStatisticReducer,
    getActivate: getActivateEmailReducer,
    getResetPassword: getResetPasswordReducer,
    getRecoverPassword: getRecoverPasswordReducer,
});

const middleware = thunk;

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware))
);


export default store;


