import {LoginSchemaInterface, RecoverySchemaInterface, ContactSchemaInterface, 
    TextareaSchemaInterface, RegisterSchemaInterface, ChangePasswordSchemaInterface,
    ChangeEmailSchemaInterface, DeleteAccountSchemaInterface, PasswordResetSchemaInterface} from '../dataSchemesService/data.schemes.interface'
;

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
    ChangePasswordSchemaInterface | ChangeEmailSchemaInterface | DeleteAccountSchemaInterface |PasswordResetSchemaInterface
;