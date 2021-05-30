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
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        };
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.switchForGet(this.type, data, store, service, dispatch, callback);
        }).catch(err => {
            throw new Error(`Error while fetching data: ${err}`);
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

    switchForGet(type, data, store, service, dispatch, callback) {
        switch(type) {
            case 'budget':
                return this.logicStateForGet(data, this.budgetState, store, service, dispatch, callback);
            case 'features':
                return this.logicStateForGet(data, this.featureState, store, service, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    logicStateForGet(data, state, store, service, dispatch, callback) {
        if (data.success) {
            state(data, store, dispatch);
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    budgetState(d, store, dispatch) {

        let income = [];
        let expenses = [];
        for (let key of d.data) {
            if (key.value === 'income') {
                income.push(key);
            } else {
                expenses.push(key);
            }
        }
        return dispatch(store.done(income, expenses));
    };

    featureState(d, store, dispatch) {
        return dispatch(store.done(d.data));
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