import ValidationService from './validationService';

export default class MarkupService {
    constructor() {
        this.validationService = new ValidationService();
    };

    inputPattern(idx, name, input, control, validationError) {
        let htmlFor = `${control.type}-${Math.random()}`;
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
                            {input(idx, name, control)}
                        </div>
                        {validationError(control)}
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