import AppService from '../appService/appService';
import {LoginSchemaInterface, RecoverySchemaInterface, 
    ContactSchemaInterface, TextareaSchemaInterface, RegisterSchemaInterface, 
    ChangeEmailSchemaInterface, DeleteAccountSchemaInterface, PasswordResetSchemaInterface, ChangePasswordSchemaInterface} from './data.schemes.interface'
;

class DataSchemesService {
    public language: string;
    private appService: AppService;

    constructor(language: string) {
        this.language = language;
        this.appService = new AppService(this.language);
    };

    loginSchema(): LoginSchemaInterface {
        return {
            email: {
                id: 0,
                value: '',
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Почта' : 'Email',
                error: this.appService.checkLanguage() ?  'Обязательно' : 'Required'
            },
            password: {
                id: 1,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                label: this.appService.checkLanguage() ? 'Пароль' : 'Password',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required'
            }
        };
    };

    recoverySchema(): RecoverySchemaInterface {
        return {
            email: {
                id: 0,
                value: '',
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Почта' : 'Email',
                error: this.appService.checkLanguage() ?  'Обязательно' : 'Required'
            }
        };
    };

    contactSchema(): ContactSchemaInterface {
        return {
            name: {
                id: 0,
                value: '',
                valid: true,
                touched: false,
                type: 'name',
                validation: {
                    minLength: 1,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Имя' : 'Name',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required'
            },
            email: {
                id: 1,
                value: '',
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Почта' : 'Email',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required'
            }
        }
    };

    textareaSchema(): TextareaSchemaInterface {
        return {
            message: {
                id: 0,
                value: '',
                label: this.appService.checkLanguage() ? 'Сообщение' : 'Message'
            },
        }
    };

    registerSchema(): RegisterSchemaInterface {
        return {
            name: {
                id: 0,
                value: '',
                valid: true,
                touched: false,
                type: 'name',
                validation: {
                    minLength: 1,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Имя' : 'Name',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required'
            },
            email: {
                id: 1,
                value: '',
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage() ? 'Почта' : 'Email',
                error: this.appService.checkLanguage() ?  'Обязательно' : 'Required'
            },
            password: {
                id: 2,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true
                },
                autocomplete: 'on',
                label: this.appService.checkLanguage() ? 'Пароль' : 'Password',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required'

            },
            confirmPassword: {
                id: 3,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Подтвердить пароль' : 'Confirm password'
            }
        };
    };

    changeEmailSchema(): ChangeEmailSchemaInterface {
        return {
            email: {
                id: 0,
                value: '',
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: this.appService.checkLanguage() ?  'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Сменить почту' : 'Change mail'
            }
        };
    };

    deleteAccountSchema(): DeleteAccountSchemaInterface {
        return {
            password: {
                id: 0,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    delete: true,
                    minLength: 6,
                    required: true,
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Введите пароль' : 'Enter password'
            }
        };
    };

    passwordResetSchema(): PasswordResetSchemaInterface {
        return {
            password: {
                id: 0,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true,
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Новый пароль' : 'New password'
            },
            confirmPassword: {
                id: 1,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Подтвердить новый пароль' : 'Confirm new password'
            }
        };
    };

    changePasswordSchema(): ChangePasswordSchemaInterface {
        return {
            oldPassword: {
                id: 0,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Старый пароль' : 'Old password'
            },
            password: {
                id: 1,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true,
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Новый пароль' : 'New password'
            },
            confirmPassword: {
                id: 2,
                value: '',
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage() ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage() ? 'Подтвердить новый пароль' : 'Confirm new password'
            },
        };
    };

    // dropdownSchema(toggle, value, currency) {
    //     if (toggle) {
    //         return {
    //             value: {
    //                 options: value
    //             },
    //             currency: {
    //                 options: currency,
    //             }
    //         };
    //     } else {
    //         return {
    //             value: {
    //                 options: value,
    //             }
    //         };
    //     }
    // };
};

export default DataSchemesService;