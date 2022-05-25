import StorageService from './storageService';
import * as actionTypes from '../redux/constants/constantsForAuth';

export default class ApiService {
    constructor(url, data, type) {
        this.data = data;
        this.type = type;
        this.url = `/api/${url}`;
        this.storage = new StorageService(localStorage);
    };

    //Event handler
    async eventFetchHandler(headers, error) {
        try {
            let response = await fetch(new Request(this.url, headers));
            return await response.json();
        } catch (err) {
            console.log(error, err);
        }
    };

    //REST
    async get(store, dispatch, monthId) {
        let headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type !== 'email-activation' ? `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Error while fetching data:');
        this.methodSwitchGet(this.type, data, store, dispatch, monthId);
    };

    async put(store, dispatch, monthId) {
        let headers = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'change-email' ||
                    this.type === 'change-password' ||  this.type === 'edit-item' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchPut(this.type, data, store, dispatch, monthId);
    };

    async post(store, dispatch, monthId) {
        let headers = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'add-item' || this.type === 'message' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchPost(this.type, data, store, dispatch, monthId);
    };

    async delete(store, dispatch, monthId) {
        let headers = {
            method: 'DELETE',
            body: this.type === 'delete-account' ? JSON.stringify(this.data) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchDelete(this.type, data, store, dispatch, monthId);
    };

    //Switch
    methodSwitchGet(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'contact':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'features':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'verify-email':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'settings':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'email-activation':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'budget':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            case 'statistics':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchPut(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'change-email':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'change-password':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'password-reset':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'edit-item':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchPost(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'login':
            case 'register':
                return this.authLogicStatement(type, data, store, dispatch);
            case 'message':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'password-recovery':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'verify-email':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'add-item':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    methodSwitchDelete(type, data, store, dispatch, monthId) {
        switch(type) {
            case 'delete-account':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'delete-budget':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch, monthId);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    };

    //Logic
    authLogicStatement(type, data, store, dispatch) {
        if (data.success) {
            if(type === 'register') {
                dispatch(store.done(data.data[1]));
                dispatch({type: actionTypes.AUTH_RESET});
                store.router(`/verify-email/${data.data[0]}`);
            } else {
                dispatch(store.done(data.token));
                store.router('/features');
            }
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
        data.data.filter(type === 'budget' ||  type === 'add-item' || type === 'edit-item' || type === 'delete-budget'
            ? val => new Date(val.date).getMonth() === monthId : val => val).map(key => {
            if (key.value.type.includes('income')) return income.push(key);
            else return expenses.push(key);
        });
        return dispatch(store.done(income, expenses));
    };

    getSimpleData(type, data, store, dispatch) {return dispatch(store.done(data.data));};
};