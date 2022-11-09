import {Document} from 'mongoose';

export interface Error {
    message: string;
  };

export interface User extends Document {
    name: string;
    token: string;
    email: string;
    pending: boolean;
    password: string;
    tokenExpire: Date,
    tokenForVerifyEmail: string;
    expireTokenForVerifyEmail: Date;
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