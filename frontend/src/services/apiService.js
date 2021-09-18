import AppService from './appService';

export default class ApiService {
    constructor(url, data, type) {
        this.data = data;
        this.type = type;
        this.url = `/api/${url}`;
        this.appService = new AppService();
    };

    //REST
    get(store, dispatch, callback) {
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
            this.getToggle(this.type, data, store, dispatch, callback);
        }).catch(err => console.log('Error while fetching data:', err));
    };

    put(store, dispatch, callback) {
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
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        };

        let headers = this.type === 'settings-email' ||
        this.type === 'settings-password' ||  this.type === 'edit-item' ? budgetHeaders : authHeaders;

        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.putToggle(this.type, data, store, dispatch, callback);
        }).catch(err => console.log('Try again later:', err));
    };

    post(store, dispatch, callback) {
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

        let headers = this.type === 'add-item' || this.type === 'message' ? budgetHeaders : authHeaders;

        let request = new Request(this.url, headers);

        fetch(request).then(response => {
            return response.json();
        }).then(data => {
            this.postToggle(this.type, data, store, dispatch, callback);
        }).catch(err => console.log('Try again later:', err));
    };

    delete(store, dispatch, callback) {
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
            this.deleteToggle(this.type, data, store, dispatch, callback);
        }).catch(err => console.log('Try again later:', err));
    };

    //Toggle
    getToggle(type, data, store, dispatch, callback) {
        switch(type) {
            case 'message':
                return this.sendMessageLogicStatement(data, store, dispatch, callback);
            case 'budget':
                return this.budgetLogicStatement(data, this.budgetState, store, dispatch, callback);
            case 'features':
                return this.budgetLogicStatement(data, this.featureState, store, dispatch, callback);
            case 'settings':
                return this.budgetLogicStatement(data, this.settingsState, store, dispatch, callback);
            case 'statistic':
                return this.budgetLogicStatement(data, this.statisticState, store, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    putToggle(type, data, store, dispatch, callback) {
        switch(type) {
            case 'settings-email':
                return this.changeLogicStatement(data, store, dispatch, callback);
            case 'settings-password':
                return this.changeLogicStatement(data, store, dispatch, callback);
            case 'edit-item':
                return this.editItemLogicStatement(data, store, dispatch, callback);
            case 'reset':
                return this.resetPasswordLogicStatement(data, store, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    postToggle(type, data, store, dispatch, callback) {
        switch(type) {
            case 'auth':
                return this.authLogicStatement(data, store, dispatch, callback)
            case 'add-item':
                return this.addItemLogicStatement(data, store, dispatch, callback);
            case 'message':
                return this.sendMessageLogicStatement(data, store, dispatch, callback);
            case 'recover':
                return this.recoverPasswordLogicStatement(data, store, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    deleteToggle(type, data, store, dispatch, callback) {
        switch(type) {
            case 'budget-delete':
                return this.deleteItemLogicStatement(data, store, dispatch, callback);
            case 'settings-delete':
                return this.deleteAccountLogicStatement(data, store, dispatch, callback);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    //Logic
    authLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            dispatch(store.done(data.id, data.token));
            store.router.push('/features');
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    changeLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.messageState(data, store, dispatch, callback);
        } else {
            callback(true);
            this.appService.delay(200).then(() =>  dispatch(store.error(data.error)));
        }
    };

    addItemLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.budgetState(data, store, dispatch);
        } else {
            callback(true);
            store.autoClosing();
            this.appService.delay(200).then(() =>  dispatch(store.error(data.error)));
        }
    };

    editItemLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.budgetState(data, store, dispatch);
        } else {
            callback(true);
            this.appService.delay(200).then(() =>  dispatch(store.error(data.error)));
        }
    };

    deleteItemLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.budgetState(data, store, dispatch);
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    sendMessageLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.messageState(data, store, dispatch, callback);
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    deleteAccountLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.messageState(data, store, dispatch);
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    resetPasswordLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.messageState(data, store, dispatch, callback);
        } else {
            callback(true);
            this.appService.delay(200).then(() =>  dispatch(store.error(data.error)));
        }
    };

    budgetLogicStatement(data, state, store, dispatch, callback) {
        if (data.success) {
            state(data, store, dispatch);
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    recoverPasswordLogicStatement(data, store, dispatch, callback) {
        if (data.success) {
            this.messageState(data, store, dispatch, callback);
        } else {
            callback(true);
            this.appService.delay(500).then(() => dispatch(store.error(data.error)));
        }
    };

    //State
    budgetState(d, store, dispatch) {
        let income = [];
        let expenses = [];
        d.data.filter(val => new Date(val.date).getMonth() === new Date().getMonth()).map(key => {
            if (key.value.type.includes('income')) return income.push(key);
            else return expenses.push(key);
        });
        return dispatch(store.done(income, expenses));
    };

    statisticState(d, store, dispatch) {
        let income = [];
        let expenses = [];
        d.data.map(key => {
            if (key.value.type.includes('income')) return income.push(key);
            else return expenses.push(key);
        });
        return dispatch(store.done(income, expenses));
    };

    featureState(d, store, dispatch) {
        return dispatch(store.done(d.success));
    };

    settingsState(d, store, dispatch) {
        return dispatch(store.done(d.success));
    };

    messageState(d, store, dispatch, callback) {
        callback(true);
        this.appService.delay(500).then(() => dispatch(store.done(d.data)));
    };
};