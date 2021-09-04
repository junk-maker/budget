import AppService from './appService';
import ValidationService from './validationService';

export default class MarkupService {
    constructor() {
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

    budgetPattern(totalBudget, totalIncome, totalExpenses, totalExpensesPercentage) {
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
    };

    addPattern(toggle, ...args) {
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

    settingsPattern() {
        return [
            {name: 'Сменить почту', to: '/change-email'},
            {name: 'Сменить пароль', to: '/change-password'},
            {name: 'Удалить аккаунт', to: '/delete-account'},
        ];
    };
};