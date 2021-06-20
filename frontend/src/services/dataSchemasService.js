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
                    minLength: 6,
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
                    minLength: 6,
                    required: true,
                },
                autocomplete: 'on',
                error: 'Обязательно',
                label: 'Подтвердить пароль',
            }
        };
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

    budgetSchema(totalBudget, totalIncome, totalExpenses, totalExpensesPercentage) {
        return {
            totalBudget: {
                name: 'общий бюджет',
                icon: '/icons/total.svg',
                display: totalBudget
            },
            totalIncome: {
                name: 'доход',
                icon: '/icons/income.svg',
                display: totalIncome
            },
            totalExpenses: {
                name: 'расходы',
                icon: '/icons/expenses.svg',
                display: totalExpenses,
                percentage: totalExpensesPercentage
            }
        };
    }

    tabItems() {
        return [
            {name: 'Бюджет', openTab: 0},
            {name: 'Доходы', openTab: 1},
            {name: 'Расходы', openTab: 2}
        ];
    };

    featuresSchema() {
        return {
            convenience:{
                heading: 'Удобство',
                text: 'Удобный и простой графический пользовательский интерфейс'
            },
            functionality:{
                heading: 'Функциональность',
                text: 'Позволяет контролировать доходы и  расходы. Можно следить за тратами, удобная система учёта'
            },
            reliability:{
                heading: 'Надёжеость',
                text: 'Ваши персональные данные не пострадают'
            },
            statistics:{
                heading: 'Статистика',
                text: 'Исчерпывающая статистика за любой интересующий вас период времени'
            },
        };
    };

    addSchema(toggle, ...args) {
        let arg = args || []
        return {
            description: {
                value: toggle ?  '' : arg[0],
                placeholder: 'Описание',
                className: 'input add__description'
            },
            category: {
                value: toggle ?  '' : arg[1],
                placeholder: 'Категория',
                className: 'input add__category'
            },
            amount: {
                value: toggle ?  '' : arg[2],
                // type: 'number',
                placeholder: 'Сумма',
                className: 'input add__amount'
            }
        };
    };

    settingsSchema() {
        return [
            {name: 'Сменить почту', openTab: 0},
            {name: 'Сменить валюту', openTab: 1},
            {name: 'Сменить пароль', openTab: 2},
            {name: 'Удалить аккаунт', openTab: 3}
        ];
    };

    changeEmailSchema() {
        return {
            email: {
                value: '',
                span: true,
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

    changePasswordSchema() {
        return {
            oldPassword: {
                value: '',
                span: true,
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
            newPassword: {
                value: '',
                span: true,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: 'Обязательно',
                label: 'Новый пароль',
            },
            confirmNewPassword: {
                value: '',
                span: true,
                valid: true,
                touched: false,
                type: 'password',
                validation: {
                    minLength: 6,
                    required: true
                },
                autocomplete: 'on',
                error: 'Обязательно',
                label: 'Подтвердить новый пароль',
            },
        };
    };

    authInputPattern(idx, name, input, control, validationError) {
        let htmlFor = `${control.type}-${Math.random()}`;
        return (
            <div className={'auth__form--input'} key={idx + name}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span className={control.span ? 'auth__span' : null}>{control.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            {input(idx, name, control)}
                        </div>
                        {validationError(control)}
                    </div>
                </div>
            </div>
        );
    }
};