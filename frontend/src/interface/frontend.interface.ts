import currencyStorage from '../json-storage/currencyStorage.json';

//Json
export type CurrencyStorageInterface = typeof currencyStorage;

//Data Service
interface DataSchemes {
    id: number;
    type?: string;
    label: string;
    error?: string;
    value: string;
    valid?: boolean;
    touched?: boolean;
    autocomplete?: string;
    validation?: {
        email?: boolean;
        delete?: boolean;
        confirm?: boolean;
        required: boolean;
        minLength?: number;
        strength?: boolean;
    };
};

export interface LoginSchemaInterface {
    email: DataSchemes;
    password: DataSchemes;
};

export interface RecoverySchemaInterface {
    email: DataSchemes;
};

export interface ContactSchemaInterface {
    name: DataSchemes;
    email: DataSchemes;
};

export interface TextareaSchemaInterface {
    message: DataSchemes;
};

export interface RegisterSchemaInterface {
    name: DataSchemes;
    email: DataSchemes;
    password: DataSchemes;
    confirmPassword: DataSchemes;
};

export interface ChangeEmailSchemaInterface {
    email: DataSchemes;
};

export interface DeleteAccountSchemaInterface {
    password: DataSchemes;
};

export interface PasswordResetSchemaInterface {
    password: DataSchemes;
    confirmPassword: DataSchemes;
};

export interface ChangePasswordSchemaInterface {
    password: DataSchemes;
    oldPassword: DataSchemes;
    confirmPassword: DataSchemes;
};

//App Service
export interface DateOptsInterface {
    month: 'long';
    day: 'numeric';
    year: 'numeric';
    weekday: 'long';
};

export interface TimeOptsInterface {
    hour: 'numeric';
    minute: '2-digit';
    timeZone: 'Europe/Moscow';
};

export interface CalculateTotalInterface {
    _id: string;
    amount: string;
    user_id: string;
    category: string;
    description: string;
    value: {id: string, type: string, translate: string, description: string};
    currency: {id: string, symbol: string, locales: string, currency: string, translate: string};
};

export interface AuthResponseInterface {
    'Server Error': string;
    'User not found': string;
    'Invalid request': string;
    'Email not found': string;
    'Not enough rights': string;
    'Password not found': string;
    '250 2.0.0 Ok: queued': string;
    'Please provide a TOKEN': string;
    'Password does not match': string;
    'The email could not be sent': string;
    'Email address already registered': string;
    'Please specify your email address': string;
    'Please confirm your email address': string;
    'The email was successfully activated': string;
    'Password has been successfully updated': string;
    'Please provide your email address and password': string;
};

export interface BudgetResponseInterface {
    'Server Error': string;
    'User not found': string;
    'read ECONNRESET': string;
    'Not enough rights': string;
    'Password not found': string;
    '250 2.0.0 Ok: queued': string;
    'Please provide an ID': string;
    'Password does not match': string;
    'Please provide password': string;
    'Please provide the data': string;
    'Email successfully updated': string;
    'The email could not be sent': string;
    'Connection closed unexpectedly': string;
    'Please specify your email address': string;
    'The user with this ID was not found': string;
    'The account was successfully deleted': string;
    'Not authorized to access this router': string;
    'Password has been successfully updated': string;
    'Please provide an email address and a message': string;
};

export interface SettingsFormSwitchInterface {
    email: () => {};
    account: () => {};
    password: () => {};
};

export interface AuthLinkInterface {
    'sign-in': string;
    'sign-up': string,
};

export interface AuthHelpLink {
    'sign-in': string;
    'sign-up': string;
    'password-recovery': string;
};

export interface CreateDateParams {
    date?: Date;
};

export interface CreateDateInterface {
    date: Date;
    day: string;
    week: number;
    year: number;
    month: string;
    dayShort: string;
    timestamp: number;
    yearShort: string;
    dayNumber: number;
    monthIndex: number;
    monthShort: string;
    monthNumber: number;
    dayNumberInWeek: number;
};

export interface CreateMonthParams {
    date?: Date;
};

export interface CreateMonthInterface {
    year: number;
    monthName: string;
    monthIndex: number;
    monthNumber: number;
    createMonthDays: () => CreateDateInterface[];
    getDay: (dayNumber: number) => CreateDateInterface;
};

export type SchemaInterface = LoginSchemaInterface | RecoverySchemaInterface | 
    ContactSchemaInterface | TextareaSchemaInterface | RegisterSchemaInterface | 
    ChangePasswordSchemaInterface | ChangeEmailSchemaInterface | DeleteAccountSchemaInterface | PasswordResetSchemaInterface
;

//Budget Service
export type FormatInterface = CalculateTotalInterface;

//Storage Service
export interface StorageServiceInterface {
    removeItem(key: string): void;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
};

//Slice Service
export interface OptsInterface {
    navigate: Function;
    rejectWithValue: Function;
};

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

//Api Service
export interface ErrorPayload {
    error: string;
    success: boolean;
};

interface DataResponseInterface {
    token: string;
    response: string
}

export interface ResponsePayload {
    data: [];
    token: string;
    error: string;
    success: boolean;
};

export type Response = ResponsePayload | ErrorPayload;

export interface SignInData {
    email: string;
    password: string;
};

export interface SignUpData {
    name: string;
    email: string;
    password: string;
};

export interface PasswordRecoveryData {
    email: string;
};

export interface PasswordResetData {
    password: string;
    confirmPassword: string;
};

export interface VerificationData {
    token: string;
};

export interface AddItemData {
    value: string; 
    amount: string;
    category: string;
    currency: string;
    description: string;
};

export interface EditItemData {
    id: string;
    value: string;  
    amount: string;
    category: string;
    currency: string; 
    description: string;
};

export interface ChangeEmailData {
    email: string;
};

export interface ChangePasswordData {
    password: string; 
    newPassword: string; 
    confirmPassword: string;
};

export interface DeleteAccountData {
    password: string;
};

export interface SendingMessageData {
    name: string;
    email: string; 
    message: string;
};

export type ApiData = SignInData | SignUpData | PasswordRecoveryData | 
    PasswordResetData | VerificationData | AddItemData | EditItemData | 
    ChangeEmailData | ChangePasswordData | DeleteAccountData | SendingMessageData | null
;

