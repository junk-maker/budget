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