import ApiService from '../apiService/apiService';
import {GetAuthLinkInterface, GetPasswordResetLinkInterface,
    GetVerifyEmailLinkInterface, GetEmailActivationLinkInterface, 
    GetFeaturesLinkInterface, GetPasswordRecoveryLinkInterface, GetSettingsLinkInterface, 
    GetContactLinkInterface, AuthInterface} from './slice.service.interface'
;

import {OptsInterface, ErrorPayload, ResponsePayload, Response} from '../../interface/frontend.interface';

class SliceService {
    getAuthLink(): GetAuthLinkInterface {
        return {
            'sign-in': 'auth/sign-in',
            'sign-up': 'auth/sign-up',
        };
    };

    getEmailActivationLink(token: string): GetEmailActivationLinkInterface {
        return {
            'email-activation': `auth/email-activation/${token}`,
        };
    };

    getPasswordRecoveryLink(): GetPasswordRecoveryLinkInterface {
        return {
            'password-recovery': 'auth/password-recovery',
        };
    };

    getPasswordResetLink(resetToken: string): GetPasswordResetLinkInterface {
        return {
            'password-reset': `auth/password-reset/${resetToken}`,
        };
    };

    getVerifyEmailLink(token: string): GetVerifyEmailLinkInterface {
        return {
            'verify-email': `auth/verify-email/${token}`,
        };
    };

    getFeaturesLink(): GetFeaturesLinkInterface {
        return {
            features: 'budget/features',
        };
    };

    getContactLink(): GetContactLinkInterface {
        return {
            contact: 'budget/contact',
        };
    };

    // getStatisticsLink(end, year, start, month, value, currency) {
    //     return {
    //         statistics: `budget/statistics/${end}/${year}/${start}/${month}/${value}/${currency.currency}`,
    //     };
    // };

    getSettingsLink(): GetSettingsLinkInterface {
        return {
            'change-email': 'budget/settings/change-email',
            'delete-account': 'budget/settings/delete-account',
            'change-password': 'budget/settings/change-password',
            settings: `budget/settings/${window.location.pathname.split('/')[2]}`,
        };
    };

    // getBudgetLink(id, end, year, start, month, currency) {
    //     return {
    //         budget: `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
    //         'add-item': `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
    //         'edit-item': `budget/budget/${end}/${year}/${start}/${month}/${currency.currency}`,
    //         'delete-budget': `budget/budget/${id}/${end}/${year}/${start}/${month}/${currency.currency}`,
    //     };
    // };

    getAuth(state: any) {
        return {
            'sign-in': state.auth,
            'sign-up': state.auth,
            'verify-email': state.verify,
            'email-activation': state.activation,
            'password-reset': state.passwordReset,
            'password-recovery': state.passwordRecovery,
        };
    };

    getApi(link: string, data: AuthInterface, type: string): ApiService {
        let api = new ApiService(link, data, type);
        return api;
    };

    authStatementLogic(type: string, opts: OptsInterface, response: ResponsePayload) {
        console.log(response)
        if (response.success) {
            if(type === 'sign-up') {
                opts.navigate(`/verify-email/${response!.data[0]}`);
                return response.data[1]?.response;
            } else {
                opts.navigate('/features');
                return response;
            };
        } else {
            return opts.rejectWithValue(response.error);
        };
    };

    // switchingByData(opts, response) {
    //     if (response.success) {
    //         return {
    //             contact: this.getSimpleData,
    //             budget: this.getComplexData,
    //             features: this.getSimpleData,
    //             settings: this.getSimpleData,
    //             'add-item': this.getComplexData,
    //             statistics: this.getComplexData,
    //             'edit-item': this.getComplexData,
    //             'change-email': this.getSimpleData,
    //             'verify-email': this.getSimpleData,
    //             'delete-budget': this.getComplexData,
    //             'password-reset': this.getSimpleData,
    //             'email-activation': this.getSimpleData,
    //             'password-recovery': this.getSimpleData,
    //         }[opts.type](response.data);
    //     } else {
    //         return opts.rejectWithValue(response.error);
    //     };
    // };

    // getComplexData(data) {
    //     let income = [];
    //     let expenses = [];
    //     data.map(val => {
    //         if (val.value.type.includes('income')) return income.push(val);
    //         else return expenses.push(val);
    //     });
    //     return {income, expenses};
    // };

    // getSimpleData(data) {return data;};
};

export default SliceService;