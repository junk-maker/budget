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
            this.getToggle(this.type, data, store, service, dispatch, callback);
        }).catch(err => console.log('Error while fetching data:', err));
    };

    post(store, service, dispatch, callback) {
        let authHeaders = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let budgetHeaders = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        };
        let headers = this.type === 'add-item' ? budgetHeaders : authHeaders;
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.postToggle(this.type, data, store, service, dispatch, callback);
        }).catch(err => console.log('Try again later:', err));
    };

    delete(store, service, dispatch, callback) {
        let headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.budgetState(data, store, dispatch);
            } else {
                callback(true);
                service.delay(500).then(() => dispatch(store.error(data.error)));
            }
        }).catch(err => console.log('Try again later:', err));
    };

    put(store, service, dispatch, callback) {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.budgetState(data, store, dispatch);
            } else {
                callback(true);
                service.delay(200).then(() =>  dispatch(store.error(data.error)));
            }
        }).catch(err => console.log('Try again later:', err));
    }

    getToggle(type, data, store, service, dispatch, callback) {
        switch(type) {
            case 'budget':
                return this.budgetLogicStatement(data, this.budgetState, store, service, dispatch, callback);
            case 'features':
                return this.budgetLogicStatement(data, this.featureState, store, service, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    postToggle(type, data, store, service, dispatch, callback) {
        switch(type) {
            case 'auth':
                return this.authLogicStatement(data, store, service, dispatch, callback)
            case 'add-item':
                return this.addItemLogicStatement(data, store, service, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    authLogicStatement(data, store, service, dispatch, callback) {
        if (data.success) {
            dispatch(store.done(data.id, data.token));
            store.router.push('/features');
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    budgetLogicStatement(data, state, store, service, dispatch, callback) {
        if (data.success) {
            state(data, store, dispatch);
        } else {
            callback(true);
            service.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    addItemLogicStatement(data, store, service, dispatch, callback) {
        if (data.success) {
            this.budgetState(data, store, dispatch);
        } else {
            callback(true);
            store.autoClosing();
            service.delay(200).then(() =>  dispatch(store.error(data.error)));
        }
    };

    budgetState(d, store, dispatch) {
        let income = [];
        let expenses = [];
        d.data.filter(val => new Date(val.date).getMonth() === new Date().getMonth())
            .map(key => {
                if (key.value.type.includes('income')) return income.push(key);
                else return expenses.push(key);
            });
        return dispatch(store.done(income, expenses, d.currency));
    };

    featureState(d, store, dispatch) {
        return dispatch(store.done(d.data));
    };
};