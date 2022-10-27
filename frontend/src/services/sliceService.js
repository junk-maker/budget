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

    getFeaturesLink() {
        return {
            features: 'budget/features',
        };
    };

    getContactLink() {
        return {
            contact: 'budget/contact',
        };
    };

    getStatisticsLink(end, year, start, month, value, currency) {
        return {
            statistics: `budget/statistics/${end}/${year}/${start}/${month}/${value}/${currency.currency}`,
        };
    };

    getSettingsLink() {
        return {
            'change-email': 'budget/settings/change-email',
            'delete-account': 'budget/settings/delete-account',
            'change-password': 'budget/settings/change-password',
            settings: `budget/settings/${window.location.pathname.split('/')[2]}`,
        };
    };

    getBudgetLink(id, end, year, start, month, currency) {
        return {
            budget: `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
            'add-item': `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
            'edit-item': `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
            'delete-budget': `budget/budget/${id}/${end}/${year}/${start}/${month}/${currency.currency}`,
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
                return response.data[1]?.response;
            } else {
                opts.navigate('/features');
                return response.token;
            };
        } else {
            return opts.rejectWithValue(response.error);
        };
    };

    switchingByData(opts, response) {
        if (response.success) {
            return {
                contact: this.getSimpleData,
                budget: this.getComplexData,
                features: this.getSimpleData,
                settings: this.getSimpleData,
                'add-item': this.getComplexData,
                statistics: this.getComplexData,
                'edit-item': this.getComplexData,
                'change-email': this.getSimpleData,
                'verify-email': this.getSimpleData,
                'delete-budget': this.getComplexData,
                'password-reset': this.getSimpleData,
                'email-activation': this.getSimpleData,
                'password-recovery': this.getSimpleData,
            }[opts.type](response.data);
        } else {
            return opts.rejectWithValue(response.error);
        };
    };

    getComplexData(data) {
        let income = [];
        let expenses = [];
        data.map(val => {
            if (val.value.type.includes('income')) return income.push(val);
            else return expenses.push(val);
        });
        return {income, expenses};
    };

    getSimpleData(data) {return data;};
};