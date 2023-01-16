export interface GetAuthLinkInterface {
    'sign-in': string;
    'sign-up': string;
};

export interface GetEmailActivationLinkInterface {
    'email-activation': string;
};

export interface GetPasswordRecoveryLinkInterface {
    'password-recovery': string;
};

export interface GetPasswordResetLinkInterface {
    'password-reset': string;
};

export interface GetVerifyEmailLinkInterface {
    'verify-email': string;
};

export interface GetFeaturesLinkInterface {
    features: string;
};

export interface GetContactLinkInterface {
    contact: string;
};

export interface GetSettingsLinkInterface {
    settings: string;
    'change-email': string;
    'delete-account': string;
    'change-password': string;
};

export interface ActionToSignInInterface {
    email: string;
    password: string;
};

export interface ActionToSignUpInterface {
    name: string;
    email: string;
    password: string;
};

export interface ActionToPasswordRecovery {
    email: string;
};

export interface ActionToPasswordResetInterface {
    password: string;
    confirmPassword: string;
};

export interface DataVerificationInterface {
    token: string;
};

export type AuthInterface = ActionToSignInInterface | ActionToSignUpInterface | 
    ActionToPasswordRecovery | DataVerificationInterface | ActionToPasswordResetInterface | null
;