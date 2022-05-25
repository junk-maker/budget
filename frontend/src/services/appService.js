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

    calculateTotal(value, expression) {
        return value.filter(expression).reduce((total, cur) => total + +cur.amount, 0);
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

    months(language) {
        return this.checkLanguage(language) ? [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ] : ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
    };

    authResponse() {
        return {
            'Server Error': this.checkLanguage(this.language) ? 'Ошибка Сервера' : 'Server Error',
            'Invalid request': this.checkLanguage(this.language) ? 'Неверный запрос' : 'Invalid request',
            'Password not found': this.checkLanguage(this.language) ? 'Неверный пароль' : 'Password not found',
            '250 2.0.0 Ok: queued': this.checkLanguage(this.language) ? 'Проверьте вашу почту' : 'Check your email',
            'User is not found': this.checkLanguage(this.language) ? 'Пользователь не найден' : 'User is not found',
            'Email not found': this.checkLanguage(this.language) ? 'Электронная почта не найдена' : 'Email not found',
            'Password updated success': this.checkLanguage(this.language) ? 'Пароль установлен' : 'Password updated success', 
            'Please provide an email': this.checkLanguage(this.language) ? 'Please provide an email' : 'Пожалуйста, укажите электронную почту',
            'Please confirm your email': this.checkLanguage(this.language) ? 'Пожалуйста подтвердите вашу электронную почту' : ' Please confirm your email',
            'The email could not be sent': this.checkLanguage(this.language) ? 'Электронное письмо не может быть отправлено' : 'The email could not be sent',
            'Email address already registered': this.checkLanguage(this.language) ? 'Электронный адрес уже зарегистрирован' : 'Email address already registered',
            'Please provide an email and password': this.checkLanguage(this.language) ? 'Пожалуйста, укажите адрес электронной почты и пароль' : 'Please provide an email and password',
        };
    };

    budgetResponse() {
        return {
            'None id': this.checkLanguage(this.language) ? 'None id' : 'Нет идентификатора',
            'Server Error': this.checkLanguage(this.language) ? 'Ошибка Сервера' : 'Server Error',
            'read ECONNRESET': this.checkLanguage(this.language) ? 'Попробуйте позже' : 'Try again later',
            'Not enough rights': this.checkLanguage(this.language) ? 'Недостаточно прав' : 'Not enough rights',
            'Password not found': this.checkLanguage(this.language) ? 'Пароль не найден' : 'Password not found',
            '250 2.0.0 Ok: queued': this.checkLanguage(this.language) ? 'Сообщение отправлено' : 'Message sent',
            'User is not found': this.checkLanguage(this.language) ? 'Пользователь не найден' : 'User is not found',
            'Password do not match': this.checkLanguage(this.language) ? 'Пароль не совпадает' : 'Password do not match',
            'Connection closed unexpectedly': this.checkLanguage(this.language) ? 'Попробуйте позже' : 'Try again later',
            'Email updated success': this.checkLanguage(this.language) ? 'Почта успешно обновлена' : 'Email update success',
            'Please provide data': this.checkLanguage(this.language) ? 'Пожалуйста предоставьте данные' : 'Please provide data',
            'Password updated success': this.checkLanguage(this.language) ? 'Пароль обновлен успешно' : 'Password updated success',
            'Account successfully deleted': this.checkLanguage(this.language) ? 'Аккаунт успешно удален' : 'Account successfully deleted',
            'The email could not be sent': this.checkLanguage(this.language) ? 'Электронное письмо не может быть отправлено' : 'The email could not be sent',
            'Not authorized to access this router': this.checkLanguage(this.language) ? 'Не авторизован для доступа' : 'Not authorized to access this router',
            'No user found with this id': this.checkLanguage(this.language) ? 'Не найдено ни одного пользователя с этим идентификатором' : 'No user found with this id',
        };
    };

    objectIteration(schema, callback) {
        return Object.keys(schema).map(name => {
            let control = schema[name];
            return callback(name, control);
        });
    };

    checkLanguage(language = this.language) {
        return (language || 'ru') === 'ru';
    };

    renderSwitch(type, schema, children, callback) {
        switch (type) {
            case 'sign-in':
            case 'sign-up':
            case 'password-reset':
            case 'password-recovery':
                return this.objectIteration(schema, callback);
            case 'verify-email':
            case 'email-activation':
                return children;
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    selectDropdownContentSwitch(type, value, currency) {
        switch (type) {
            case 'value':
                return value;
            case 'currency':
                return currency;
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    paginatedDataHandler(data, pageSize, currentPage, currentCurrency) {
        return data.filter(val => currentCurrency.locales === val.currency.locales).slice(((currentPage * pageSize) - pageSize), (currentPage * pageSize));
    };

    authLink() {
        return {
            'sign-in': '/sign-up',
            'sign-up': '/sign-in',
        };
    }

    authHelpLink() {
        return {
            'password-recovery': '/',
            'sign-in': '/password-recovery',
            'sign-up': '/password-recovery',
        };
    }
};