export default class DataSchemasService {
    loginSchema() {
        return {
            email: {
                value: '',
                valid: true,
                span: false,
                type: 'email',
                label: 'Почта',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: 'Обязательно'
            },
            password: {
                value: '',
                span: false,
                valid: true,
                touched: false,
                label: 'Пароль',
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: 'Обязательно'
            }
        };
    };

    contactSchema() {
        return {
            name: {
                value: '',
                valid: true,
                label: 'Имя',
                touched: false,
                type: 'name',
                validation: {
                    minLength: 1,
                    required: true
                },
                error: 'Обязательно'
            },
            email: {
                value: '',
                valid: true,
                span: false,
                type: 'email',
                label: 'Почта',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: 'Обязательно'
            }
        }
    };

    textareaSchema() {
        return {
            message: {
                value: '',
                label: 'Сообщение'
            },
        }
    };

    recoverSchema() {
        return {
            email: {
                value: '',
                span: false,
                valid: true,
                type: 'email',
                label: 'Почта',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: 'Обязательно'
            }
        };
    };

    registerSchema() {
        return {
            name: {
                value: '',
                span: false,
                valid: true,
                label: 'Имя',
                touched: false,
                type: 'name',
                validation: {
                    minLength: 1,
                    required: true
                },
                error: 'Обязательно'
            },
            email: {
                value: '',
                span: false,
                valid: true,
                type: 'email',
                label: 'Почта',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: 'Обязательно'
            },
            password: {
                value: '',
                span: false,
                valid: true,
                touched: false,
                label: 'Пароль',
                type: 'password',
                validation: {
                    minLength: 2,
                    strength: true,
                    required: true
                },
                autocomplete: 'on',
                error: 'Обязательно',

            },
            confirmPassword: {
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
                error: 'Обязательно',
                label: 'Подтвердить пароль',
            }
        };
    };

    changeEmailSchema() {
        return {
            email: {
                value: '',
                span: false,
                valid: true,
                type: 'email',
                touched: false,
                validation: {
                    email: true,
                    required: true
                },
                error: 'Обязательно',
                label: 'Сменить почту',
            }
        };
    };

    deleteAccountSchema() {
        return {
            password: {
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
                error: 'Обязательно',
                label: 'Введите пароль',
            }
        };
    };

    resetPasswordSchema() {
        return {
            password: {
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
                error: 'Обязательно',
                label: 'Новый пароль'
            },
            confirmPassword: {
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
                error: 'Обязательно',
                label: 'Подтвердить новый пароль',
            }
        };
    };

    changePasswordSchema() {
        return {
            oldPassword: {
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
                error: 'Обязательно',
                label: 'Старый пароль',
            },
            password: {
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
                error: 'Обязательно',
                label: 'Новый пароль',
            },
            confirmPassword: {
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
                error: 'Обязательно',
                label: 'Подтвердить новый пароль',
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