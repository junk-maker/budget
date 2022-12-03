import {Types} from 'mongoose';

export default interface User {
    name: string;
    email: string;
    pending: boolean;
    password: string;
    _id: Types.ObjectId;
    token?: string | undefined;
    tokenExpire?: Date | undefined;
    resetPasswordToken?: string | undefined;
    tokenForVerifyEmail?: string | undefined;
    resetPasswordExpire?: string | undefined;
    expireTokenForVerifyEmail?: Date | undefined;

    getToken: () => string;
    getSignedJwtToken: () => string;
    getVerifyEmailToken: () => string;
    matchPassword: (password: string) => Promise<boolean>;
};