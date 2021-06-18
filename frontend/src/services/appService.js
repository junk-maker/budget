export default class  AppService  {
    months() {
        return [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    };

    authToggle(type, args) {
        switch (type) {
            case 'sign-in':
                return args.in;

            case 'sign-up':
                return args.up;

            case 'verify':
                return args.verify;

            case 'recover-password':
                return args.recover;

            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    renderToggle(type, schema, children, callback) {
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
    };

    errorHandlerToggle(type, args) {
        switch (type) {
            case 'sign-in':
                return args.in();

            case 'sign-up':
                return args.up();

            case 'budget':
                return args.budget();

            case 'features':
                return args.features();

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
    }

    title(d) {
        return  `${this.months()[d.getMonth()]} ${d.getFullYear()}`;
    };

    date(d) {
        let opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat('ru-RU', opts).format(d);
    };

    time(d) {
        let opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
        return Intl.DateTimeFormat('ru-Ru', opts).format(d);
    };

    delay(duration) {
        return new Promise((resolve, reject) => {
            if (duration < 0 || undefined) {
                reject (new Error ('Working?!'));
            }
            setTimeout(resolve, duration);
        });
    };

    objectIteration(schema, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            return callback(idx, name, control);
        });
    };

    objectEditIteration(schema, edit, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            control.value = edit[name];
            return callback(idx, name, control);
        });
    };
};