import {Document} from 'mongoose';

export interface ServerError {
    message: string;
};

export interface AppErrorHandler {
    message: string;
    statusCode: number;
};

export interface User extends Document {
    name: string;
    email: string;
    pending: boolean;
    password: string;
    token: string | undefined;
    tokenExpire: Date | undefined;
    tokenForVerifyEmail: string | undefined;
    expireTokenForVerifyEmail: Date | undefined;
};

export interface Budget extends Document {
    date: Date;
    amount: string;
    category: string;
    description: string;
    user_id: User['_id'];
    value: {id: string, type: string, translate: string, description: string};
    currency: {id: string, symbol: string, locales: string, currency: string, translate: string};
};

export interface Message {
    url: string;
    html: string;
    email: string;
    name?: string;
};
