import authReducer from './slice/authSlice';
import emailActivationReducer from './slice/emailActivationSlice';
import passwordRecoveryReducer from './slice/passwordRecoverySlice';
import passwordResetReducer from './slice/passwordResetSlice';
import verifyEmailReducer from './slice/verifyEmailSlice';
import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
      auth: authReducer,
      activation: emailActivationReducer,
      passwordRecovery: passwordRecoveryReducer,
      passwordReset: passwordResetReducer,
      verify: verifyEmailReducer,
    },
});