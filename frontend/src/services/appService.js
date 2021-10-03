export default class  AppService {
    constructor(language) {
        this.language = language;
        this.locales = this.checkLanguage(this.language) ? `${language}-RU` : `${language}-EN`;
    };

    date(d) {
        let opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat(this.locales, opts).format(d);
    };

    time(d) {
        let opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
        return Intl.DateTimeFormat(this.locales, opts).format(d);
    };

    months(language) {
        return this.checkLanguage(language) ? [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ] : ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
    };

    title(d) {
        return `${this.months(this.language)[d.getMonth()]}`;
    };

    currentMonth(d) {
        return `${this.months(this.language)[d.getMonth()]}`;
    };

    delay(duration) {
        return new Promise((resolve, reject) => {
            if (duration < 0 || undefined) {
                reject (new Error ('Working?!'));
            }
            setTimeout(resolve, duration);
        });
    };

    authToggle(type, args) {
        switch (type) {
            case 'sign-in':
                return args.in;
            case 'sign-up':
                return args.up;
            case 'reset-password':
                return args.reset;
            case 'verify':
                return args.verify;
            case 'recover-password':
                return args.recover;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    listsToggle(type, args) {
        switch (type) {
            case 'income':
                return args.inc;
            case 'expenses':
                return args.exp;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    authResponseToggle(type) {
        switch (type) {
            case 'Email not found':
                return this.checkLanguage(this.language) ? 'Электронная почта не найдена' : 'Email not found';
            case 'Invalid request':
                return this.checkLanguage(this.language) ? 'Неверный запрос' : 'Invalid request';
            case 'User is not found':
                return this.checkLanguage(this.language) ? 'Пользователь не найден' : 'User is not found';
            case 'Password not found':
                return this.checkLanguage(this.language) ? 'Неверный пароль' : 'Password not found';
            case '250 2.0.0 Ok: queued':
                return this.checkLanguage(this.language) ? 'Проверьте вашу почту' : 'Check your email';
            case 'Password updated success':
                return this.checkLanguage(this.language) ? 'Пароль установлен' : 'Password updated success';
            case 'Email address already registered':
                return this.checkLanguage(this.language) ? 'Электронный адрес уже зарегистрирован' : 'Email address already registered';
            case 'Please provide an email and password':
                return this.checkLanguage(this.language) ? 'Пожалуйста, укажите адрес электронной почты и пароль' : 'Please provide an email and password';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    budgetResponseToggle(type) {
        switch (type) {
            case 'read ECONNRESET':
            case  'Connection closed unexpectedly':
                return this.checkLanguage(this.language) ? 'Попробуйте позже' : 'Try again later';
            case 'Password not found':
                return this.checkLanguage(this.language) ? 'Пароль не найден' : 'Password not found';
            case '250 2.0.0 Ok: queued':
                return this.checkLanguage(this.language) ? 'Сообщение отправлено' : 'Message sent';
            case 'Email updated success':
                return this.checkLanguage(this.language) ? ' Почта успешно обновлена' : 'Email update success';
            case 'Password updated success':
                return this.checkLanguage(this.language) ? 'Пароль обновлен успешно' : 'Password updated success';
            case 'Not authorized to access this router':
                return this.checkLanguage(this.language) ? 'Не авторизован для доступа' : 'Not authorized to access this router';
            case 'Password do not match':
                return this.checkLanguage(this.language) ? 'Пароль не совпадает' : 'Password do not match';
            case 'No user found with this id':
                return this.checkLanguage(this.language) ? 'Не найдено ни одного пользователя с этим идентификатором' : 'No user found with this id';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    settingsToggle(type, args) {
        switch (type) {
            case 'change-email':
                return args.email;
            case 'change-password':
                return args.password;
            case 'delete-account':
                return args.account;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    objectIteration(schema, callback) {
        return Object.keys(schema).map(name => {
            let control = schema[name];
            return callback(name, control);
        });
    };

    resetStateToggle(type, args) {
        switch (type) {
            case 'sign-in':
                return args.in();
            case 'sign-up':
                return args.up();
            case 'reset-password':
                return args.reset();
            case 'recover-password':
                return args.recover();
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    selectToggle(type, value, currency, opts) {
        switch (type) {
            case 'value':
                return value(opts);
            case 'currency':
                return currency(opts);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    selectDropdownContentToggle(type, value, currency) {
        switch (type) {
            case 'value':
                return value
            case 'currency':
                return currency
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    selectSliderContentToggle(type, slide, month) {
        switch (type) {
            case 'month':
                return month;
            case 'currency':
                return slide;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    selectSliderHandler(type, args) {
        switch (type) {
            case 'month':
                return args.month();
            case 'currency':
                return args.slide();
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    objectEditIteration(schema, edit, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            control.value = edit[name];
            return callback(idx, name, control);
        });
    };

    renderToggle(type, schema, children, callback) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
            case 'reset-password':
            case 'recover-password':
                return this.objectIteration(schema, callback);
            case 'verify':
                return children;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    tabToggle(type, args) {
        switch (type) {
            case 'TotalBudget':
                return args.total();
            case 'Income':
                return args.income();
            case 'Expenses':
                return args.expenses();
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    dataVisualizationToggle(type, service) {
        switch (type) {
            case 'PieChart':
                return service.pieData();
            case 'DoubleBarChart':
                return service.doubleData(this.language);
            case 'BalanceBarChart':
                return service.balanceData(this.language);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    classNamePasswordStrengthToggle(form, type) {
        switch (type) {
            case 1:
                return !form.hasOwnProperty('oldPassword') ?'auth__form--input-title' : 'auth__form--input-title-left';
            case 2:
                return 'auth__form--input-medium';
            case 3:
                return 'auth__form--input-strong';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    checkLanguage(language = this.language) {
        return (language || 'ru') === 'ru';
    };
};