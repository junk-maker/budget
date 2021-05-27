export default class AppService {
    _auth= true;
    _type = true;
    _service = true;
    _months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];


    title(d) {
        return  `${this._months[d.getMonth()]} ${d.getFullYear()}`;
    };

    date(d) {
        let opts= {weekday: 'long', month: 'long', year: 'numeric', day: 'numeric'};
        return Intl.DateTimeFormat('ru-RU', opts).format (d);
    };

    time(d) {
        let opts={hour: 'numeric',minute: '2-digit', timeZone: 'Europe/Moscow'};
        return Intl.DateTimeFormat('ru-Ru', opts).format (d);
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

    valueRender(schema, callback) {
        return this.objectIteration(schema, callback)
    }
};