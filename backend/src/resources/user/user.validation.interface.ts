export interface TokenForRegister {
    token: string;
    verifyEmailToken: string;
};

export interface TokenForVerifyEmail {
    email: string;
    token: string;
};
