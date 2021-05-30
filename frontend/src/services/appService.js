export const AppService = {
    months() {
        return [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    },

    switchClassName(type) {
        switch (type) {
            case 'verify':
            case 'sign-in':
            case 'recover-password':
                return 'auth__header--auth';

            case 'sign-up':
                return 'auth__header--register';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchAuthHandler(type, login, register) {
        switch (type) {
            case 'sign-in':
                return login;

            case 'sign-up':
                return register;

            case 'verify':
                return null;

            case 'recover-password':
                return null;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchHelpHeading(type) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
                return 'Нужна помощь?';

            case 'recover-password':
                return 'На главную';

            case 'verify':
                return null;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },


    switchHeading(type) {
        switch (type) {
            case 'sign-in':
                return 'Авторизация';

            case 'recover-password':
                return 'Сброс пароля';

            case 'sign-up':
                return 'Регистрация';

            case 'verify':
                return 'Подтвердить почту';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchValueRender(type, schema, children, callback) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
            case 'recover-password':
                return this.objectIteration(schema, callback);

            case 'verify':
                return children;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchButtonHeading(type, count) {
        switch (type) {
            case 'sign-in':
                return 'Войти';

            case 'sign-up':
                return 'Создать';

            case 'recover-password':
                return 'Сбросить';

            case 'verify':
                return count !== 0 ? count : 'Отправить повторно';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchButtonOptions(type, verify, expression) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
            case 'recover-password':
                return expression;

            case 'verify':
                return verify;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchLinksForHelp(type) {
        switch (type) {
            case 'verify':
                return '';

            case 'recover-password':
                return '/';

            case 'sign-in':
            case 'sign-up':
                return'/recover-password';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchLinksForAuth(type) {
        switch (type) {
            case 'sign-in':
                return '/sign-up';
            case 'sign-up':
                return '/sign-in';

            case 'verify':
            case 'recover-password':
                return '';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchHeadingForAuth(type) {
        switch (type) {
            case 'sign-in':
                return 'Зарегистрироваться';
            case 'sign-up':
                return 'аккаунтом';

            case 'verify':
            case 'recover-password':
                return;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },


    switchTitleForAuth(type) {
        switch (type) {
            case 'sign-in':
                return 'Нет аккаунта?';
            case 'sign-up':
                return 'Воспользоваться';

            case 'verify':
            case 'recover-password':
                return;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchMarkdown(type, expression) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
                return expression;

            case 'verify':
            case 'recover-password':
                return null;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchErrorContent(type) {
        switch (type) {
            case 'sign-up':
                return 'Адрес электронной почты уже зарегистрирован';

            case 'sign-in':
                return <div>Неверные данные: <br/> электронная почта или пароль</div>

            case 'verify':
            case 'recover-password':
                return;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchErrorHandler(type, auth, budget) {
        switch (type) {
            case 'sign-up':
            case 'sign-in':
                return auth();

            case 'budget':
            case 'features':
                return budget();

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchValue(type, income, expenses) {
        switch (type) {
            case 'income':
                return income;
            case 'expenses':
                return expenses;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchAltImg(type) {
        switch (type) {
            case 'income':
                return 'повышение';
            case 'expenses':
                return 'понижение';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchSrcImg(type) {
        switch (type) {
            case 'income':
                return '/icons/income.svg';
            case 'expenses':
                return '/icons/expenses.svg';

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },

    switchPercentage(type, expression) {
        switch (type) {
            case 'income':
                return null;
            case 'expenses':
                return expression;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    },


    title(d) {
        return  `${this.months()[d.getMonth()]} ${d.getFullYear()}`;
    },

    date(d) {
        let opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat('ru-RU', opts).format(d);
    },

    time(d) {
        let opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
        return Intl.DateTimeFormat('ru-Ru', opts).format(d);
    },

    delay(duration) {
        return new Promise((resolve, reject) => {
            if (duration < 0 || undefined) {
                reject (new Error ('Working?!'));
            }
            setTimeout(resolve, duration);
        });
    },

    objectIteration(schema, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            return callback(idx, name, control);
        });
    }
};