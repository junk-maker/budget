export default class AppService {
    constructor () {
        this.day = new Date().getDate();
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
        this.months = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
    }

    _auth= true;
    _type = true;
    _service = true;


    displayTitle () {
        return `${this.months[this.month]} ${this.year}`;
    };

    displaySubtitle() {
        let newMonths = [];
        this.months.forEach(w => {
            let newWord;
            if (w[w.length - 1] === 'ь') {
                newWord = w.replace(w[w.length - 1], 'я');
            } else if (w[w.length - 1] === 'т') {
                newWord = `${w}a`;
            } else {
                newWord = w.replace(w[w.length - 1], 'я');
            }
            return newMonths.push(newWord);
        });
        return `${this.day} ${newMonths[this.month]} ${this.year}`;
    };

    objectIteration(schema, callback) {
        return Object.keys(schema).map((name, idx) => {
            let control = schema[name];
            return callback(idx, name, control);
        });
    };
};