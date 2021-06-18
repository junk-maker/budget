export default class DataSchemasService {
    loginSchema() {
      return {
          email: {
              value: '',
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
                equality: false,
                value: '',
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
                equality: false,
                value: '',
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
        // let tog = toggle || true;
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
                currency: {
                    options: currency,
                }
            }
        }

    };
};