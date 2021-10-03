import StorageService from './storageService';

export default class ApiService {
    constructor(url, data, type) {
        this.data = data;
        this.type = type;
        this.url = `/api/${url}`;
        this.storage = new StorageService(localStorage);
    };

    //REST
    get(store, dispatch, monthId) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.methodSwitchGet(this.type, data, store, dispatch, monthId);
        }).catch(err => console.log('Error while fetching data:', err));
    };

    put(store, dispatch, monthId) {
        let authHeaders = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        let budgetHeaders = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };

        let headers = this.type === 'settings-email' ||
        this.type === 'settings-password' ||  this.type === 'edit-item' ? budgetHeaders : authHeaders;

        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.methodSwitchPut(this.type, data, store, dispatch, monthId);
        }).catch(err => console.log('Try again later:', err));
    };

    post(store, dispatch, monthId) {
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
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };

        let headers = this.type === 'add-item' || this.type === 'message' ? budgetHeaders : authHeaders;

        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.methodSwitchPost(this.type, data, store, dispatch, monthId);
        }).catch(err => console.log('Try again later:', err));
    };

    delete(store, dispatch, monthId) {
        let headers = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        }
        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.methodSwitchDelete(this.type, data, store, dispatch, monthId);
        }).catch(err => console.log('Try again later:', err));
    };

    //Switch
    methodSwitchGet(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'message':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'features':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'settings':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'budget':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            case 'statistic':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchPut(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'settings-email':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'settings-password':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'reset':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'edit-item':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchPost(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'auth':
                return this.authLogicStatement(data, store, dispatch);
            case 'message':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'recover':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'add-item':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchDelete(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'settings-delete':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'budget-delete':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    //Logic
    authLogicStatement(data, store, dispatch) {
        if (data.success) {
            dispatch(store.done(data.token));
            store.router.push('/features');
        } else {
            dispatch(store.error(data.error));
        }
    };

    dataStateLogic(type, data, state, store, dispatch, monthId) {
        if (data.success) {
            state(type, data, store, dispatch, monthId);
        } else {
            dispatch(store.error(data.error));
        }
    };

    //Get data
    getComplexData(type, data, store, dispatch, monthId) {
        let income = [];
        let expenses = [];
        data.data.filter(type === 'budget' ||  type === 'add-item' || type === 'edit-item' || type === 'budget-delete'
            ? val => new Date(val.date).getMonth() === monthId : val => val).map(key => {
            if (key.value.type.includes('income')) return income.push(key);
            else return expenses.push(key);
        });
        return dispatch(store.done(income, expenses));
    };

    getSimpleData(type, data, store, dispatch) {return dispatch(store.done(data.data));};
};