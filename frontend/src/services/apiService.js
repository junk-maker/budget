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
            const response = await fetch(new Request(this.url, headers));
            return await response.json();
        } catch (err) {
            console.log(error, err);
        };
    };

    //REST
    async get(store, dispatch) {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type !== 'email-activation' ? `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        const data = await this.eventFetchHandler(headers, 'Error while fetching data:');
        this.methodSwitchGet(this.type, data, store, dispatch);
    };

    async put(store, dispatch) {
        const headers = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'change-email' ||
                    this.type === 'change-password' ||  this.type === 'edit-item' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        const data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchPut(this.type, data, store, dispatch);
    };

    async post(store, dispatch) {
        const headers = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'add-item' || this.type === 'message' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        const data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchPost(this.type, data, store, dispatch);
    };

    async delete(store, dispatch) {
        const headers = {
            method: 'DELETE',
            body: this.type === 'delete-account' ? JSON.stringify(this.data) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };

        const data = await this.eventFetchHandler(headers, 'Try again later:');
        this.methodSwitchDelete(this.type, data, store, dispatch);
    };

    //Switch
    methodSwitchGet(type, data, store, dispatch) {
        switch(type) {
            case 'contact':
            case 'features':
            case 'settings':
            case 'verify-email':
            case 'email-activation':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'budget':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch);
            case 'statistics':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchPut(type, data, store, dispatch) {
        switch(type) {
            case 'edit-item':
            case 'change-email':
            case 'password-reset':
            case 'change-password':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchPost(type, data, store, dispatch) {
        switch(type) {
            case 'login':
            case 'register':
                return this.authLogicStatement(type, data, store, dispatch);
            case 'message':
            case 'add-item':
            case 'verify-email':
            case 'password-recovery':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchDelete(type, data, store, dispatch) {
        switch(type) {
            case 'delete-account':
                return this.dataStateLogic(type, data, this.getSimpleData, store, dispatch);
            case 'delete-budget':
                return this.dataStateLogic(type, data, this.getComplexData, store, dispatch);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
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
            };
        } else {
            dispatch(store.error(data.error));
        };
    };

    dataStateLogic(type, data, state, store, dispatch) {
        if (data.success) {
            state(type, data, store, dispatch);
        } else {
            dispatch(store.error(data.error));
        };
    };

    //Get data
    getComplexData(type, data, store, dispatch) {
        let income = [];
        let expenses = [];
        data.data.map(val => {
            if (val.value.type.includes('income')) return income.push(val);
            else return expenses.push(val);
        });
        return dispatch(store.done(income, expenses));
    };

    getSimpleData(type, data, store, dispatch) {return dispatch(store.done(data.data));};
};