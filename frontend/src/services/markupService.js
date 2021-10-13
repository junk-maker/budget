import AppService from './appService';
import ValidationService from './validationService';

export default class MarkupService {
    constructor(language) {
        this.language = language;
        this.appService = new AppService();
        this.validationService = new ValidationService();
    };

    featuresPattern() {
        return {
            convenience:{
                id: 0,
                heading: this.appService.checkLanguage(this.language) ? 'Удобство' : 'Convenience',
                text: this.appService.checkLanguage(this.language) ?
                    'Удобный и простой графический пользовательский интерфейс' :
                    'Convenient and simple graphical user interface'
            },
            functionality:{
                id: 1,
                heading: this.appService.checkLanguage(this.language) ? 'Функциональность' : 'Functionality',
                text: this.appService.checkLanguage(this.language) ?
                    'Позволяет контролировать доходы и  расходы. Можно следить за тратами, удобная система учёта' :
                    'Allows you to control income and expenses. You can track your expenses, a convenient accounting system'
            },
            reliability:{
                id: 2,
                heading: this.appService.checkLanguage(this.language) ? 'Надёжность' : 'Reliability',
                text: this.appService.checkLanguage(this.language) ?
                    'Ваши персональные данные не пострадают' :
                    'Your personal data will not be affected'

            },
            statistics:{
                id: 3,
                heading: this.appService.checkLanguage(this.language) ? 'Статистика' : 'Statistics',
                text: this.appService.checkLanguage(this.language) ?
                    'Исчерпывающая статистика за любой интересующий вас период времени' :
                    'Comprehensive statistics for any period of time you are interested in'
            },
        };
    };

    settingsPattern() {
        return [
            {
                id: 0,
                name: this.appService.checkLanguage(this.language) ? 'Сменить почту' : 'Change email',
                to: '/change-email'
            },
            {
                id: 1,
                name: this.appService.checkLanguage(this.language) ? 'Сменить пароль' : 'Change password',
                to: '/change-password'
            },
            {
                id: 2,
                name: this.appService.checkLanguage(this.language) ? 'Удалить аккаунт' : 'Delete account',
                to: '/delete-account'
            },
        ];
    };

    toggleListLanguage(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Ваш лист пуст' : 'Your sheet is empty';
            case 'sub':
                return this.appService.checkLanguage(this.language) ? 'Пожалуйста добавьте значение' : 'Please add a value';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
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

    toggleBudgetLanguage(type) {
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

    toggleButtonLanguage(type) {
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
    };

    addPattern(toggle, ...args) {
        let arg = args || []
        return {
            description: {
                id: 0,
                value: toggle ?  '' : arg[0],
                placeholder: this.appService.checkLanguage(this.language) ? 'Описание' : 'Description',
                className: 'input add__description'
            },
            category: {
                id: 1,
                value: toggle ?  '' : arg[1],
                placeholder: this.appService.checkLanguage(this.language) ? 'Категория' : 'Category',
                className: 'input add__category'
            },
            amount: {
                id: 2,
                value: toggle ?  '' : arg[2],
                // type: 'number',
                placeholder: this.appService.checkLanguage(this.language) ? 'Сумма' : 'Amount',
                className: 'input add__amount'
            }
        };
    };

    togglePreviewLanguage(type) {
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

    toggleFeatureLanguage(type) {
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

    toggleContactLanguage(type) {
        switch (type) {
            case 'main':
                return this.appService.checkLanguage(this.language) ? 'Связаться с нами' : 'Contact us';
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    matchingPasswords(form, control) {
        return form.hasOwnProperty('confirmPassword') ? control.value !== form.password.value &&
        form.confirmPassword.value.length > 1 ?
            control.validation.confirm ?
                <div className={'auth__form--input-error'}>
                    <div className={
                        !form.hasOwnProperty('oldPassword') ? 'auth__form--input-title' : 'auth__form--input-settings'}>
                        <span>
                            {
                                this.appService.checkLanguage(this.language) ?
                                    'Пароли не совпадают' : 'Password mismatch'
                            }
                        </span>
                    </div>
                </div> : null
            : null : null;
    };

    passwordStrength(form, result, control) {
        return control.validation.strength ? form.password.value.length > 1 ?
            <div className={'auth__form--input-error'}>
                <div className={this.appService.classNamePasswordStrengthSwitch(form, result.score)}>
                    <span>{result.message}</span>
                </div>
            </div> : null : null;
    };

    inputPattern(form, name, input, control) {
        let htmlFor = `${control.type}-${Math.random()}`;
        let result = control.validation.strength ?
            this.validationService.strengthChecker(form.password.value, this.language) : null;
        return (
            <div className={'auth__form--input'} key={control.id}>
                <div className={'auth__form--input-box'}>

                    <label htmlFor={htmlFor} className={'auth__form--input-label'}>
                        <div className={'auth__form--input-heading'}>
                            <span className={control.span ? 'auth__span' : 'settings__span'}>{control.label}</span>
                        </div>
                    </label>
                    <div className={'auth__form--input-wrapper'}>
                        <div className={'auth__form--input-cell'}>
                            {input(name, result, control)}
                        </div>
                        {this.validationPattern(control)}
                        {this.matchingPasswords(form, control)}
                        {/*{this.passwordStrength(form, result, control)}*/}
                    </div>
                </div>
            </div>
        );
    };

    budgetPattern(totalBudget, totalIncome, totalExpenses, totalExpensesPercentage) {
        return {
            totalBudget: {
                id: 0,
                name: this.appService.checkLanguage(this.language) ? 'общий бюджет' : 'total budget',
                icon: '/icons/total.svg',
                display: totalBudget
            },
            totalIncome: {
                id: 1,
                name: this.appService.checkLanguage(this.language) ? 'доход' : 'income',
                icon: '/icons/income.svg',
                display: totalIncome
            },
            totalExpenses: {
                id: 2,
                name: this.appService.checkLanguage(this.language) ? 'расходы' : 'expenses',
                icon: '/icons/expenses.svg',
                display: totalExpenses,
                percentage: totalExpensesPercentage
            }
        };
    };
};