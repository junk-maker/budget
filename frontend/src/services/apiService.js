export default class ApiService {
    constructor(url, data, type) {
        this.url = `api/${url}`;
        this.data = data;
        this.type = type;
    };

    get(store, service, dispatch, callback) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        };
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(d => {
            if (this.type === 'budget') {
                this.getBudgetLogicStatement(d, store, service, dispatch, callback);
            } else {
                this.getFeaturesLogicStatement(d, store, service, dispatch, callback);
            }
        })
            .catch(err => {
                console.log('Error while fetching data:', err);
            });
    };

    post(...args) {
        let headers = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let request = new Request(this.url, headers);
        let [store, router, service, dispatch, callback] = args;

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            if (args.length === 0) {
                console.log('work')
            } else {
                this.authLogicStatement(data, store, router, service, dispatch, callback);
            }
        })
            .catch(err => console.log('Try again later:', err));
    };

    delete() {};

    getBudgetIteration(d) {
        let income = [];
        let expenses = [];
        for (let key of d.data) {
            if (key.value === 'income') {
                income.push(key)
            } else {
                expenses.push(key)
            }
        }
        return [income, expenses];
    };

    getBudgetLogicStatement(d, store, service, dispatch, callback) {
        if (d.success) {
            let [income, expenses] = this.getBudgetIteration(d);
            return dispatch(store.done(income, expenses));
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(d.error)));
        }
    };

    getFeaturesLogicStatement(d, store, service, dispatch, callback) {
        if (d.success) {
            return dispatch(store.done(d.data));
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(d.error)));
        }
    };

    authLogicStatement(d, store, router, service, dispatch, callback) {
        if (d.success) {
            dispatch(store.done(d.id, d.token));
            router.push('/features');
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(d.error)));
        }
    };
};