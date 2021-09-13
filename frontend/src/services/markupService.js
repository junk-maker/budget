import AppService from './appService';
import ValidationService from './validationService';

export default class MarkupService {
    constructor(language) {
        this.language = language;
        this.appService = new AppService();
        this.validationService = new ValidationService();
    };

    inputPattern(idx, form, name, input, control) {
        let htmlFor = `${control.type}-${Math.random()}`;
        let result = control.validation.strength ? this.validationService.strengthChecker(form.password.value) : null;
        return (
            <div className={'auth__form--input'} key={idx + name}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span className={control.span ? 'auth__span' : 'settings__span'}>{control.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            {input(idx, name, result, control)}
                        </div>
                        {this.validationPattern(control)}
                        {this.matchingPasswords(form, control)}
                        {this.passwordStrength(form, result, control)}
                    </div>
                </div>
            </div>
        );
    };

    validationPattern(control) {
        return  this.validationService.isInvalid(control.valid, control.touched, !!control.validation)
            || control.required ?
            <div className={'auth__form--input-error'}>
                <div className={'auth__form--input-title'}>
                    <span>{control.error || 'Введите верное значение'}</span>
                </div>
            </div>  : null
    };

    matchingPasswords(form, control) {
        return form.hasOwnProperty('confirmPassword') ? control.value !== form.password.value &&
        form.confirmPassword.value.length > 1 ?
            control.validation.confirm ?
                <div className={'auth__form--input-error'}>
                    <div className={
                        !form.hasOwnProperty('oldPassword') ? 'auth__form--input-title' : 'auth__form--input-settings'}>
                        <span>Пароли не совпадают</span>
                    </div>
                </div> : null
            : null : null;
    };

    passwordStrength(form, result, control) {
        return control.validation.strength ? form.password.value.length > 1 ?
            <div className={'auth__form--input-error'}>
                <div className={this.appService.classNamePasswordStrengthToggle(form, result.score)}>
                    <span>{result.message}</span>
                </div>
            </div> : null : null;
    };

    featuresPattern() {
        return {
            convenience:{
                heading: this.appService.checkLanguage(this.language) ? 'Удобство' : 'Convenience',
                text: this.appService.checkLanguage(this.language) ?
                    'Удобный и простой графический пользовательский интерфейс' :
                    'Convenient and simple graphical user interface'
            },
            functionality:{
                heading: this.appService.checkLanguage(this.language) ? 'Функциональность' : 'Functionality',
                text: this.appService.checkLanguage(this.language) ?
                    'Позволяет контролировать доходы и  расходы. Можно следить за тратами, удобная система учёта' :
                    'Allows you to control income and expenses. You can track your expenses, a convenient accounting system'
            },
            reliability:{
                heading: this.appService.checkLanguage(this.language) ? 'Надёжность' : 'Reliability',
                text: this.appService.checkLanguage(this.language) ?
                    'Ваши персональные данные не пострадают' :
                    'Your personal data will not be affected'

            },
            statistics:{
                heading: this.appService.checkLanguage(this.language) ? 'Статистика' : 'Statistics',
                text: this.appService.checkLanguage(this.language) ?
                    'Исчерпывающая статистика за любой интересующий вас период времени' :
                    'Comprehensive statistics for any period of time you are interested in'
            },
        };
    };

    budgetPattern(totalBudget, totalIncome, totalExpenses, totalExpensesPercentage) {
        return {
            totalBudget: {
                name: this.appService.checkLanguage(this.language) ? 'общий бюджет' : 'total budget',
                icon: '/icons/total.svg',
                display: totalBudget
            },
            totalIncome: {
                name: this.appService.checkLanguage(this.language) ? 'доход' : 'income',
                icon: '/icons/income.svg',
                display: totalIncome
            },
            totalExpenses: {
                name: this.appService.checkLanguage(this.language) ? 'расходы' : 'expenses',
                icon: '/icons/expenses.svg',
                display: totalExpenses,
                percentage: totalExpensesPercentage
            }
        };
    };

    addPattern(toggle, ...args) {
        let arg = args || []
        return {
            description: {
                value: toggle ?  '' : arg[0],
                placeholder: this.appService.checkLanguage(this.language) ? 'Описание' : 'Description',
                className: 'input add__description'
            },
            category: {
                value: toggle ?  '' : arg[1],
                placeholder: this.appService.checkLanguage(this.language) ? 'Категория' : 'Category',
                className: 'input add__category'
            },
            amount: {
                value: toggle ?  '' : arg[2],
                // type: 'number',
                placeholder: this.appService.checkLanguage(this.language) ? 'Сумма' : 'Amount',
                className: 'input add__amount'
            }
        };
    };

    settingsPattern() {
        return [
            {
                name: this.appService.checkLanguage(this.language) ? 'Сменить почту' : 'Change email',
                to: '/change-email'
            },
            {
                name: this.appService.checkLanguage(this.language) ? 'Сменить пароль' : 'Change password',
                to: '/change-password'
            },
            {
                name: this.appService.checkLanguage(this.language) ? 'Удалить аккаунт' : 'Delete account',
                to: '/delete-account'
            },
        ];
    };

    languagePreviewToggle(type) {
        switch (type) {
            case 'title':
                return this.appService.checkLanguage(this.language) ? 'Бюджет' : 'Budget';
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Добро пожаловать' : 'Welcome';
            case 'sub':
                return this.appService.checkLanguage(this.language) ? 'Возьми финансы под контроль' : 'Take control of your finances';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    languageListToggle(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Ваш лист пуст' : 'Your sheet is empty';
            case 'sub':
                return this.appService.checkLanguage(this.language) ? 'Пожалуйста добавьте значение' : 'Please add a value';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    languageFeatureToggle(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Приложение для финансов' : 'Finance app';
            case 'sub':
                return this.appService.checkLanguage(this.language) ?
                    'Наши инструменты помогут контролировать ваши персональные финансы' :
                    'Our tools will help you control your personal finances';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    languageBudgetToggle(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Доступный бюджет на' : 'Available budget in';
            case 'sub':
                return this.appService.checkLanguage(this.language) ?
                    ' | валюта -' :
                    ' | currency -';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    languageContactToggle(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Связаться с нами' : 'Contact us';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    languageButtonToggle(type) {
        switch (type) {
            case 'go':
                return this.appService.checkLanguage(this.language) ? 'Перейти' : 'Go to';
            case 'send':
                return this.appService.checkLanguage(this.language) ? 'Отправить' : 'Send';
            case 'auth':
                return this.appService.checkLanguage(this.language) ? 'Авторизоваться' : 'Login';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    }
};