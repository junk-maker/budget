export default class  AppService {
    constructor(language) {
        this.language = language;
        this.locales = this.checkLanguage(this.language) ? `${language}-RU` : `${language}-EN`;
    };

    date(d) {
        const opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat(this.locales, opts).format(d);
    };

    time(d) {
        const opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
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
            'Please provide an email': this.checkLanguage(this.language) ? 'Пожалуйста, укажите электронную почту' : 'Please provide an email',
            'Please confirm your email': this.checkLanguage(this.language) ? 'Пожалуйста подтвердите вашу электронную почту' : ' Please confirm your email',
            'The email could not be sent': this.checkLanguage(this.language) ? 'Электронное письмо не может быть отправлено' : 'The email could not be sent',
            'Email address already registered': this.checkLanguage(this.language) ? 'Электронный адрес уже зарегистрирован' : 'Email address already registered',
            'Please provide an email and password': this.checkLanguage(this.language) ? 'Пожалуйста, укажите адрес электронной почты и пароль' : 'Please provide an email and password',
        };
    };

    budgetResponse() {
        return {
            'None id': this.checkLanguage(this.language) ? 'Нет идентификатора' : 'None id',
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
    };

    authHelpLink() {
        return {
            'password-recovery': '/',
            'sign-in': '/password-recovery',
            'sign-up': '/password-recovery',
        };
    };

    getWeekNumber(date) {
        const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfTheYear.getTime()) / 86400000;
      
        return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
    };

    createDate(date) {
        const d = date?.date ?? new Date();

        const year = d.getFullYear();
        const timestamp = d.getTime();
        const dayNumber = d.getDate();
        const monthIndex = d.getMonth();
        const week = this.getWeekNumber(d);
        const monthNumber = d.getMonth() + 1;
        const dayNumberInWeek = d.getDay() + 1;
        const month = d.toLocaleDateString(this.locales, {month: 'long'});
        const day = d.toLocaleDateString(this.locales, {weekday: 'long'});
        const dayShort = d.toLocaleDateString(this.locales, {weekday: 'short'});
        const yearShort = d.toLocaleDateString(this.locales, {year: '2-digit'});
        const monthShort = d.toLocaleDateString(this.locales, {month: 'short'});

        return {
            day,
            week,
            year,
            month,
            date: d,
            dayShort,
            timestamp,
            yearShort,
            dayNumber,
            monthIndex,
            monthShort,
            monthNumber,
            dayNumberInWeek,
          };
    };

    getYearsInterval(year) {
        const startYear = Math.floor(year / 10) * 10;
        return [...Array(10)].map((_, index) => startYear + index);
    };

    getMonthNumberOfDays(monthIndex, yearNumber = new Date().getFullYear()) {
        return new Date(yearNumber, monthIndex + 1, 0).getDate();
    };

    createMonth(params) {
        const date = params?.date ?? new Date();
        const d = this.createDate({date});
        const {month: monthName, year, monthNumber, monthIndex} = d;
        const getDay = dayNumber => this.createDate({date: new Date(year, monthIndex, dayNumber)});

        const createMonthDays = () => {
            const days = [];

            for (let i = 0; i <= this.getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
                days[i] = getDay(i + 1);
            };

            return days;
        };

        return {
            year,
            getDay,
            monthName,
            monthIndex,
            monthNumber,
            createMonthDays,
        };
    };

    createYear(params) {
        const monthCount = 12;
        const today = this.createDate();
        const year = params?.year ?? today.year;
        const monthNumber = params?.monthNumber ?? today.monthNumber;
        const month = this.createMonth({date: new Date(year, monthNumber - 1)});
        const getMonthDays = monthIndex => this.createMonth({date: new Date(year, monthIndex)}).createMonthDays();

        const createYearMonthes = () => {
            const monthes = [];

            for (let i = 0; i <= monthCount - 1; i += 1) {
                monthes[i] = getMonthDays(i);
            };

            return monthes;
        };

        return {
            year,
            month,
            createYearMonthes,
        };
    };

    checkDateIsEqual(dateOne, dateTwo) {
        return dateOne.getDate() === dateTwo.getDate() && dateOne.getMonth() === dateTwo.getMonth() && dateOne.getFullYear() === dateTwo.getFullYear();
    };

    checkIsToday(date) {
        return this.checkDateIsEqual(new Date(), date);
    };

    getWeekDaysNames(firstWeekDay) {
        const weekDaysNames = Array.from({length: 7});

        weekDaysNames.forEach((_, i) => {
          const {day, dayNumberInWeek, dayShort} = this.createDate({
            date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i)
          });
      
          weekDaysNames[dayNumberInWeek - 1] = {day, dayShort};
        });
      
        return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)];
    };

    getMonthesNames() {
        const monthesNames = Array.from({length: 12});

        monthesNames.forEach((_, i) => {
          const {date, month, monthShort, monthIndex} = this.createDate({
            date: new Date(new Date().getFullYear(), new Date().getMonth() + i, new Date().getDate())
          });

          monthesNames[monthIndex] = {date, month, monthShort, monthIndex};
        });
    
        return monthesNames;
    };

    leapYear(year) {
        return !((year % 4) || (!(year % 100) && (year % 400)));
    };

    checkLeapYearMonth(language) {
        return this.checkLanguage(language) ? 'февраль' : 'february';
    };

    isBetween(day, end, start, between) {
        let bool = null;
        between.flat().forEach(val => val.date >= start.date && val.date < end.date ? val.date === day?.date ? bool = true : null : null);
        return bool;
    };
};