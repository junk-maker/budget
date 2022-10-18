import authReducer from './slice/authSlice';
import logoutReducer from './slice/logoutSlice';
import {configureStore} from '@reduxjs/toolkit';
import budgetReducer from './slice/budgetSlice';
import contactReducer from './slice/сontactSlice';
import settingsReducer from './slice/settingsSlice';
import featuresReducer from './slice/featuresSlice';
import statisticsReducer from './slice/statisticsSlice';
import verifyEmailReducer from './slice/verifyEmailSlice';
import passwordResetReducer from './slice/passwordResetSlice';
import emailActivationReducer from './slice/emailActivationSlice';
import passwordRecoveryReducer from './slice/passwordRecoverySlice';

export default configureStore({
    reducer: {
      auth: authReducer,
      budget: budgetReducer,
      logout: logoutReducer,
      contact: contactReducer,
      features: featuresReducer,
      settings: settingsReducer,
      verify: verifyEmailReducer,
      statistics: statisticsReducer,
      activation: emailActivationReducer,
      passwordReset: passwordResetReducer,
      passwordRecovery: passwordRecoveryReducer,
    },
});