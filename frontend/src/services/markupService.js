import AppService from './appService';
import ValidationService from './validationService';

export default class MarkupService {
    constructor(language) {
        this.language = language;
        this.appService = new AppService();
        this.validationService = new ValidationService();
    };

    featuresTemplate() {
        return [
            {
                id: 0,
                title: this.appService.checkLanguage(this.language) ? 'Удобство' : 'Convenience',
                description: this.appService.checkLanguage(this.language) ?
                    'Удобный и простой графический пользовательский интерфейс' :
                    'Convenient and simple graphical user interface',
            },
            {
                id: 1,
                title: this.appService.checkLanguage(this.language) ? 'Функциональность' : 'Functionality',
                description: this.appService.checkLanguage(this.language) ?
                    'Позволяет контролировать доходы и  расходы. Можно следить за тратами, удобная система учёта' :
                    'Allows you to control income and expenses. You can track your expenses, a convenient accounting system',
            },
            {
                id: 2,
                title: this.appService.checkLanguage(this.language) ? 'Надёжность' : 'Reliability',
                description: this.appService.checkLanguage(this.language) ?
                    'Ваши персональные данные не пострадают' :
                    'Your personal data will not be affected',
            },
            {
                id: 3,
                title: this.appService.checkLanguage(this.language) ? 'Статистика' : 'Statistics',
                description: this.appService.checkLanguage(this.language) ?
                    'Исчерпывающая статистика за любой интересующий вас период времени' :
                    'Comprehensive statistics for any period of time you are interested in',
            }
        ];
    };

    settingsTemplate() {
        return [
            {
                id: 0,
                to: '/change-email',
                name: this.appService.checkLanguage(this.language) ? 'Сменить почту' : 'Change email',
            },
            {
                id: 1,
                to: '/change-password',
                name: this.appService.checkLanguage(this.language) ? 'Сменить пароль' : 'Change password',
            },
            {
                id: 2,
                to: '/delete-account',
                name: this.appService.checkLanguage(this.language) ? 'Удалить аккаунт' : 'Delete account',
            },
        ];
    };

    listHeadingTemplate(type) {
        return {
            icon: '/icons/close.svg',
            'income-icon': '/icons/income.svg',
            'expenses-icon': '/icons/expenses.svg',
            title: this.appService.checkLanguage(this.language) ? 'Ваш лист пуст' : 'Your sheet is empty',
            subtitle: this.appService.checkLanguage(this.language) ? 'Пожалуйста добавьте значение' : 'Please add a value',
        }
    };

    validationMarkupTemplate(control) {
        let error = control.type === 'email' ? control.value.length > 2 ? 
            this.appService.checkLanguage(this.language) ? 'Неверный адрес электронной почты' : 'Invalid email address' : control.error : control.error || 'Введите верное значение';

        return  this.validationService.isInvalid(control.valid, control.touched, !!control.validation) || control.required ?
            <div className={'form__error'}>
                <div className= {'form__heading'}>
                    <span>{error}</span>
                </div>
            </div> : null
        ;
    };

    budgetHeadingTemplate() {
        return {
            add: this.appService.checkLanguage(this.language) ? 'Добавить' : 'Add',
            change: this.appService.checkLanguage(this.language) ? 'Изменить' : 'Change',
            subtitle: this.appService.checkLanguage(this.language) ?' | валюта -' : ' | currency -',
            dropdown: this.appService.checkLanguage(this.language) ? 'Выбрать опцию' : 'Select an option',
            title: this.appService.checkLanguage(this.language) ? 'Доступный бюджет на' : 'Available budget in',
        };
    };

    svgHeadingTemplate() {
        return {
            ok: this.appService.checkLanguage(this.language) ? 'Хорошо' : 'Ok',
            deny: this.appService.checkLanguage(this.language) ? 'Отклонить' : 'Deny',
            logout: this.appService.checkLanguage(this.language) ? 'Выход' : 'Logout',
            income: this.appService.checkLanguage(this.language) ? 'Доход' : 'Income',
            close: this.appService.checkLanguage(this.language) ? 'Закрыть' : 'Close',
            expenses: this.appService.checkLanguage(this.language) ? 'Расходы' : 'Expenses',
            'pie-chart': this.appService.checkLanguage(this.language) ? 'Круговая диаграмма' : 'Pie chart',
        };
    };

    removePopupHeadingTemplate() {
        return {
            title: this.appService.checkLanguage(this.language) ? 'Вы уверены, что хотите удалить пользователя?' : 'Are you sure you want to delete the user?',
        };
    };

    sidebarTemplate() {
        return [
            {id: 0, name: 'Features', to: '/features', icon: '/icons/features.svg', alt: this.appService.checkLanguage(this.language) ? 'Особенности' : 'Features'},
            {id: 1, name: 'Budget', to: '/budget', icon: '/icons/budget.svg', alt: this.appService.checkLanguage(this.language) ? 'Бюджет' : 'Budget'},
            {id: 2, name: 'Statistics', to: '/statistics', icon: '/icons/graph.svg', alt: this.appService.checkLanguage(this.language) ? 'Статистика' : 'Statistics'},
            {id: 3, name: 'Contact', to: '/contact', icon: '/icons/contacts.svg', alt: this.appService.checkLanguage(this.language) ? 'Контакт' : 'Contact'},
            {id: 4, name: 'Settings', to: '/settings/change-email', icon: '/icons/services.svg', alt: this.appService.checkLanguage(this.language) ? 'Настройки' : 'Settings'},
        ];
    };

    addTemplate(toggle, ...args) {
        const arg = args || [];

        return {
            description: {
                id: 0,
                value: toggle ?  '' : arg[0],
                className: 'input add__description',
                placeholder: this.appService.checkLanguage(this.language) ? 'Описание' : 'Description',
            },
            category: {
                id: 1,
                value: toggle ?  '' : arg[1],
                className: 'input add__category',
                placeholder: this.appService.checkLanguage(this.language) ? 'Категория' : 'Category',
            },
            amount: {
                id: 2,
                value: toggle ?  '' : arg[2],
                className: 'input add__amount',
                placeholder: this.appService.checkLanguage(this.language) ? 'Сумма' : 'Amount',
            }
        };
    };

    previewHeadingTemplate() {
        return {
            go: this.appService.checkLanguage(this.language) ? 'Перейти' : 'Go to',
            title: this.appService.checkLanguage(this.language) ? 'Бюджет' : 'Budget',
            auth: this.appService.checkLanguage(this.language) ? 'Авторизоваться' : 'Login',
            greeting: this.appService.checkLanguage(this.language) ? 'Добро пожаловать' : 'Welcome',
            action: this.appService.checkLanguage(this.language) ? 'Возьми финансы под контроль' : 'Take control of your finances',
        };
    };

    emailActivationHeadingTemplate() {
        return {
            call: this.appService.checkLanguage(this.language) ? 'Вы можете войти сейчас!' : 'You can login now!',
            success: this.appService.checkLanguage(this.language) ? 'Вы успешно активированы' : 'You have been successfully activated',
        };
    };

    verifyEmailHeadingTemplate() {
        return {
            check: this.appService.checkLanguage(this.language) ? 'Проверьте ваш почтовый ящик, и' : 'Check your inbox, and',
            helper: this.appService.checkLanguage(this.language) ? 'Если вы не получили письмо:' : 'If you have not received the letter:',
            verify: this.appService.checkLanguage(this.language) ? 'подтвердите свой адрес электронной почты.' : 'confirm your email address',
        };
    };

    featuresHeadingTemplate() {
        return {
            title: this.appService.checkLanguage(this.language) ? 'Приложение для финансов' : 'Finance app',
            subtitle: this.appService.checkLanguage(this.language) ? 'Наши инструменты помогут контролировать ваши персональные финансы' : 'Our tools will help you control your personal finances',
        };
    };

    contactHeadingTemplate() {
        return {
            send: this.appService.checkLanguage(this.language) ? 'Отправить' : 'Send',
            title: this.appService.checkLanguage(this.language) ? 'Связаться с нами' : 'Contact us',
        };
    };

    statisticsHeadingTemplate() {
        return {
            title: this.appService.checkLanguage(this.language) ? 'Статистика' : 'Statistics',
            dropdown: this.appService.checkLanguage(this.language) ? 'Выбрать статистику' : 'Select statistics',
            statistics: this.appService.checkLanguage(this.language) ? 'Статистика не выбрана' : 'No statistics selected',
        };
    };

    chartsHeadingTemplate() {
        return {
            sum: this.appService.checkLanguage(this.language) ? 'сумма' : 'sum',
            cat: this.appService.checkLanguage(this.language) ? 'категория' : 'category',
            charts: this.appService.checkLanguage(this.language) ? 'Нет данных' : 'There is no data',
        };
    };

    notFoundHeadingTemplate() {
        return {
            subtitle: this.appService.checkLanguage(this.language) ? 'Страница не найдена' : 'Page not found',
            title: this.appService.checkLanguage(this.language) ? 'Что-то пошло не так!' : 'Something went wrong!',
        };
    };
    
    settingsHeadingTemplate() {
        return {
            set: this.appService.checkLanguage(this.language) ? 'Установить' : 'Set',
            change: this.appService.checkLanguage(this.language) ? 'Сменить' : 'Change',
            delete: this.appService.checkLanguage(this.language) ? 'Удалить' : 'Delete',
            title: this.appService.checkLanguage(this.language) ? 'Настройки' : 'Settings',
            'delete-account': this.appService.checkLanguage(this.language) ? 'Вы уверены, что хотите удалить свой аккаунт?' : 'Are you sure you want to delete your account?',
        };
    };

    matchingPasswordsMarkupTemplate(form, control) {
        return form.hasOwnProperty('confirmPassword') ? control.value !== form.password.value &&
            form.confirmPassword.value.length > 1 ? control.validation.confirm ?
                <div className={'form__error'}>
                    <div className={
                        !form.hasOwnProperty('oldPassword') ? 'form__heading' : 'form__heading'}>
                        <span>
                            {this.appService.checkLanguage(this.language) ? 'Пароли не совпадают' : 'Password mismatch'}
                        </span>
                    </div>
                </div> : null
            : null : null
        ;
    };

    passwordStrengthMarkupTemplate(form, result, control) {
        return control.validation.strength ? form.password.value.length > 1 ?
            <div className={'form__error'}>
                <div className={this.classNamePasswordStrength(form)[result.score]}>
                    <span>{result.message}</span>
                </div>
            </div> : null : null
        ;
    };

    inputTemplate(form, name, input, control) {
        const htmlFor = `${control.type}-${Math.random()}`;
        const result = control.validation.strength ? this.validationService.strengthChecker(form.password.value, this.language) : null;

        return (
            <div className={'form'} key={control.id}>
                <div className={'form__container'}>

                    <label htmlFor={htmlFor} className={'form__label'}>
                        <div className={'form__title'}>
                            <span className={'form__span'}>{control.label}</span>
                        </div>
                    </label>
                    <div className={'form__wrapper'}>
                        <div className={'form__cell'}>
                            {input(name, result, control)}
                        </div>
                        {this.validationMarkupTemplate(control)}
                        {this.matchingPasswordsMarkupTemplate(form, control)}
                        {this.passwordStrengthMarkupTemplate(form, result, control)}
                    </div>
                </div>
            </div>
        );
    };

    classNamePasswordStrength(form) {
        return {
            2: 'form__medium',
            3: 'form__strong',
            1: 'form__heading',
        };
    };

    authHeadingTemplate() {
        return {
            'sign-up': this.appService.checkLanguage() ? 'Регистрация' : 'Registration',
            'sign-in': this.appService.checkLanguage() ? 'Авторизация' : 'Authorization',
            'verify-email':this.appService.checkLanguage() ? 'Подтвердить почту' : 'Confirm mail',
            'password-reset': this.appService.checkLanguage() ? 'Установить пароль' : 'Set password',
            'password-recovery': this.appService.checkLanguage() ? 'Забыли пароль?' : 'Forgot your password',
            'email-activation': this.appService.checkLanguage() ? 'Активация пользователя' : 'User activation',
        };
    };

    authToggleTemplate() {
        return {
            'sign-up': this.appService.checkLanguage() ? 'Воспользоваться' : 'Use',
            'sign-in': this.appService.checkLanguage() ? 'Нет аккаунта? ' : 'Do not have an account?',
        };
    };

    authToggleLinkTemplate() {
        return {
            'sign-up': this.appService.checkLanguage() ? 'аккаунтом' : 'account',
            'sign-in': this.appService.checkLanguage() ? 'Зарегистрироваться' : 'Register now',
        };
    };

    authButtonTemplate(count) {
        return {
            'sign-in': this.appService.checkLanguage() ? 'Войти' : 'Sign in',
            'sign-up': this.appService.checkLanguage() ? 'Создать' : 'Sign up',
            'password-reset': this.appService.checkLanguage() ? 'Установить' : 'Set',
            'email-activation': this.appService.checkLanguage() ? 'Войти' : 'Sign in',
            'password-recovery': this.appService.checkLanguage() ? 'Сбросить' : 'Reset',
            'verify-email': count !== 0 ? count : this.appService.checkLanguage() ? 'Отправить повторно' : 'Resend',
        };
    };

    authHelpTemplate() {
        return {
            'sign-up': this.appService.checkLanguage() ? 'Нужна помощь?' : 'Need help?',
            'sign-in': this.appService.checkLanguage() ? 'Нужна помощь?' : 'Need help?',
            'password-recovery': this.appService.checkLanguage() ? 'На главную' : 'To main',
        };
    };

    authToggleHelpTemplate(markup) {
        return {
            'sign-in': markup,
            'sign-up': markup,
        };
    };

    dataVisualizationTemplate(service) {
        return {
            'PieChart': service.pieData(),
            'DoubleBarChart': service.doubleData(this.language),
            'BalanceBarChart': service.balanceData(this.language),
        };
    };

    budgetTemplate(totalBudget, totalIncome, totalExpenses, totalExpensesPercentage) {
        return [
            {
                id: 0,
                display: totalBudget,
                icon: '/icons/total.svg',
                title: this.appService.checkLanguage(this.language) ? 'общий бюджет' : 'total budget',
            },
            {
                id: 1,
                display: totalIncome,
                icon: '/icons/income.svg',
                title: this.appService.checkLanguage(this.language) ? 'доход' : 'income',
            },
            {
                id: 2,
                display: totalExpenses,
                icon: '/icons/expenses.svg',
                percentage: totalExpensesPercentage,
                title: this.appService.checkLanguage(this.language) ? 'расходы' : 'expenses',
            }
        ]
    };

    datepickerHeadingTemplate() {
        return {
            icon: '/icons/datepicker-arrow.svg',
            select: this.appService.checkLanguage() ? 'Выбрать' : 'Select',
            left: this.appService.checkLanguage() ? 'Стрелка-влево' : 'Arrow-left',
            right: this.appService.checkLanguage() ? 'Стрелка-вправо' : 'Arrow-right',
        };
    };

    sliderHeadingTemplate() {
        return {
            icon: '/icons/slider-arrow.svg',
            left: this.appService.checkLanguage() ? 'Стрелка-влево' : 'Arrow-left',
            right: this.appService.checkLanguage() ? 'Стрелка-вправо' : 'Arrow-right',
        };
    };

    dropdownHeadingTemplate() {
        return {
            icon: '/icons/dropdown-arrow.svg',
            alt: this.appService.checkLanguage() ? 'Выбрать' : 'Select',
        };
    };
};