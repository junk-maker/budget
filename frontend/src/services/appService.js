export default class  AppService {
    date(d) {
        let opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat('ru-RU', opts).format(d);
    };

    time(d) {
        let opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
        return Intl.DateTimeFormat('ru-Ru', opts).format(d);
    };

    months() {
        return [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    };

    title(d) {
        return  `${this.months()[d.getMonth()]} ${d.getFullYear()}`;
    };

    currentMonth(d) {
        return `${this.months()[d.getMonth()]}`;
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

    settingsToggle(type, args) {
        switch (type) {
            case 'change-email':
                return args.email;
            case 'change-password':
                return args.password;
            case 'delete-account':
                return args.account;
            case 'settings':
                return args.settings;
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    objectIteration(schema, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            return callback(idx, name, control);
        });
    };

    errorHandlerToggle(type, args, reset) {
        switch (type) {
            case 'sign-in':
                return args.in();
            case 'sign-up':
                return args.up();
            case 'reset-password':
                return args.reset();
            case 'recover-password':
                return args.recover();
            case 'budget':
                return args.budget(reset);
            case 'contact':
                return args.contact(reset);
            case 'features':
                return args.features(reset);
            case 'statistic':
                return args.statistic(reset);
            case 'settings':
            case 'change-email':
            case 'delete-account':
            case 'change-password':
                return args.settings(reset);
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

    selectContentToggle(type, value, currency) {
        switch (type) {
            case 'value':
                return value;
            case 'currency':
                return currency;
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

    dataVisualizationToggle(type, service) {
        switch (type) {
            case 'PieChart':
                return service.pieData();
            case 'DoubleBarChart':
                return service.doubleData();
            case 'BalanceBarChart':
                return service.balanceData();
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };
};