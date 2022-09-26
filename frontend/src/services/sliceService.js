import ApiService from './apiService';

export default class SliceService {
    getAuthLink() {
        return {
            'sign-in': 'auth/sign-in',
            'sign-up': 'auth/sign-up',
        };
    };

    getEmailActivationLink(token) {
        return {
            'email-activation': `auth/email-activation/${token}`,
        };
    };

    getPasswordRecoveryLink() {
        return {
            'password-recovery': 'auth/password-recovery',
        };
    };

    getPasswordResetLink(resetToken) {
        return {
            'password-reset': `auth/password-reset/${resetToken}`,
        };
    };

    getVerifyEmailLink(token) {
        return {
            'verify-email': `auth/verify-email/${token}`,
        };
    };

    getAuth(state) {
        return {
            'sign-in': state.auth,
            'sign-up': state.auth,
            'verify-email': state.verify,
            'email-activation': state.activation,
            'password-reset': state.passwordReset,
            'password-recovery': state.passwordRecovery,
        };
    };

    getApi(link, data, type) {
        let api =  new ApiService(link, data, type);
        return api;
    };

    authStatementLogic(type, opts, response) {
        if (response.success) {
            if(type === 'sign-up') {
                opts.navigate(`/verify-email/${response.data[0]}`);
                return response.data[2];
            } else {
                opts.navigate('/features');
                return response.token;
            };
        } else {
            return opts.rejectWithValue(response.error);
        };
    };

    dataStateLogic(opts, response) {
        if (response.success) {
            return response.data;
        } else {
            return opts.rejectWithValue(response.error);
        };
    };
};