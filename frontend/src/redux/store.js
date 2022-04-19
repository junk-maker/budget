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
import {getStatisticsReducer} from './reducers/statisticsReducer';
import {getVerifyEmailReducer} from './reducers/verifyEmailReducer';
import {getPasswordResetReducer} from './reducers/passwordResetReducer';
import {getPasswordRecoveryReducer} from './reducers/passwordRecoveryReducer';
import {getAnEmailActivationReducer} from './reducers/emailActivationReducer';

const reducer = combineReducers({
    getAuth: getAuthReducer,
    getLogout: getLogoutReducer,
    getBudget: getBudgetReducer,
    getContact: getContactReducer,
    getFeatures: getFeaturesReducer,
    getSettings: getSettingsReducer,
    getVerify: getVerifyEmailReducer,
    getStatistics: getStatisticsReducer,
    getPasswordReset: getPasswordResetReducer,
    getActivation: getAnEmailActivationReducer,
    getPasswordRecovery: getPasswordRecoveryReducer,
});

const middleware = thunk;

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(middleware))
);


export default store;


