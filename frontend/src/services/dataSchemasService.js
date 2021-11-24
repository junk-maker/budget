import AppService from './appService';

export default class DataSchemasService {
    constructor(language) {
        this.language =language;
        this.appService = new AppService();
    };

    loginSchema() {
        return {
            email: {
                id: 0,
                value: '',
                valid: true,
                span: false,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage(this.language) ? 'Почта' : 'Email',
                error: this.appService.checkLanguage(this.language) ?  'Обязательно' : 'Required'
            },
            password: {
                id: 1,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                label: this.appService.checkLanguage(this.language) ? 'Пароль' : 'Password',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required'
            }
        };
    };

    recoverSchema() {
        return {
            email: {
                id: 0,
                value: '',
                span: false,
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage(this.language) ? 'Почта' : 'Email',
                error: this.appService.checkLanguage(this.language) ?  'Обязательно' : 'Required'
            }
        };
    };

    contactSchema() {
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
                label: this.appService.checkLanguage(this.language) ? 'Имя' : 'Name',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required'
            },
            email: {
                id: 1,
                value: '',
                valid: true,
                span: false,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage(this.language) ? 'Почта' : 'Email',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required'
            }
        }
    };

    textareaSchema() {
        return {
            message: {
                id: 0,
                value: '',
                label: this.appService.checkLanguage(this.language) ? 'Сообщение' : 'Message'
            },
        }
    };

    registerSchema() {
        return {
            name: {
                id: 0,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'name',
                validation: {
                    minLength: 1,
                    required: true
                },
                label: this.appService.checkLanguage(this.language) ? 'Имя' : 'Name',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required'
            },
            email: {
                id: 1,
                value: '',
                span: false,
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                label: this.appService.checkLanguage(this.language) ? 'Почта' : 'Email',
                error: this.appService.checkLanguage(this.language) ?  'Обязательно' : 'Required'
            },
            password: {
                id: 2,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true
                },
                autocomplete: 'on',
                label: this.appService.checkLanguage(this.language) ? 'Пароль' : 'Password',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required'

            },
            confirmPassword: {
                id: 3,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Подтвердить пароль' : 'Confirm password'
            }
        };
    };

    changeEmailSchema() {
        return {
            email: {
                id: 0,
                value: '',
                span: false,
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: this.appService.checkLanguage(this.language) ?  'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Сменить почту' : 'Change mail'
            }
        };
    };

    deleteAccountSchema() {
        return {
            password: {
                id: 0,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Введите пароль' : 'Enter password'
            }
        };
    };

    resetPasswordSchema() {
        return {
            password: {
                id: 0,
                value: '',
                valid: true,
                span: false,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true,
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Новый пароль' : 'New password'
            },
            confirmPassword: {
                id: 1,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Подтвердить новый пароль' : 'Confirm new password'
            }
        };
    };

    changePasswordSchema() {
        return {
            oldPassword: {
                id: 0,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Старый пароль' : 'Old password'
            },
            password: {
                id: 1,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true,
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Новый пароль' : 'New password'
            },
            confirmPassword: {
                id: 2,
                value: '',
                span: false,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 2,
                    confirm: true,
                    required: true
                },
                autocomplete: 'on',
                error: this.appService.checkLanguage(this.language) ? 'Обязательно' : 'Required',
                label: this.appService.checkLanguage(this.language) ? 'Подтвердить новый пароль' : 'Confirm new password'
            },
        };
    };

    dropdownSchema(toggle, value, currency) {
        if (toggle) {
            return {
                value: {
                    options: value
                },
                currency: {
                    options: currency,
                }
            };
        } else {
            return {
                value: {
                    options: value,
                }
            };
        }
    };
};