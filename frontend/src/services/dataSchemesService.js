import AppService from './appService';

export default class DataSchemesService {
    constructor(language) {
        this.language =language;
        this.appService = new AppService();
    };

    loginScheme() {
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

    recoveryScheme() {
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

    contactScheme() {
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

    textareaScheme() {
        return {
            message: {
                id: 0,
                value: '',
                label: this.appService.checkLanguage(this.language) ? 'Сообщение' : 'Message'
            },
        }
    };

    registerScheme() {
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

    changeEmailScheme() {
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

    deleteAccountScheme() {
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

    passwordResetScheme() {
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

    changePasswordScheme() {
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

    dropdownScheme(toggle, value, currency) {
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