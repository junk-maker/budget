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
    async get() {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type !== 'email-activation' ? `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Error while fetching data:');
        console.log(data, 'get')
        return data;
    };

    async put() {
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

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        return data;
    };

    async post() {
        const headers = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'add-item' || this.type === 'message' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        return data;
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

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        return this.methodSwitchDelete(this.type, data, store, dispatch);
    };

    //Switch
    methodSwitchGet(type, data, opts) {
        switch(type) {
            case 'contact':
            case 'features':
            case 'settings':
            case 'verify-email':
            case 'email-activation':
                return this.dataStateLogic(data, this.getSimpleData, opts);
            case 'budget':
                return this.dataStateLogic(data, this.getComplexData, opts);
            case 'statistics':
                return this.dataStateLogic(data, this.getComplexData, opts);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchPut(type, data, opts) {
        switch(type) {
            case 'change-email':
            case 'password-reset':
            case 'change-password':
                return this.dataStateLogic(data, this.getSimpleData, opts);
            case 'edit-item':
                return this.dataStateLogic(data, this.getComplexData, opts);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchPost(type, data, opts) {
        switch(type) {
            case 'sign-in':
            case 'sign-up':
                return this.authStatementLogic(type, data, opts);
            case 'message':
            case 'verify-email':
            case 'password-recovery':
                return this.dataStateLogic(data, this.getSimpleData, opts);
            case 'add-item':
                return this.dataStateLogic(data, this.getComplexData, opts);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    methodSwitchDelete(type, data, store, dispatch) {
        switch(type) {
            case 'delete-account':
                return this.dataStateLogic(data, this.getSimpleData, store, dispatch);
            case 'delete-budget':
                return this.dataStateLogic(data, this.getComplexData, store, dispatch);
            default:
                throw new Error(`Unknown type: ${type}`);
        };
    };

    //Logic
    authStatementLogic(type, data, opts) {
        if (data.success) {
            if(type === 'sign-up') {
                opts.navigate(`/verify-email/${data.data[0]}`);
                return data.data[1];
            } else {
                opts.navigate('/features');
                return data.token;
            };
        } else {
            return opts.rejectWithValue(data.error);
        };
    };

    dataStateLogic(data, state, opts) {
        if (data.success) {
            state(data);
        } else {
            return opts.rejectWithValue(data.error);
        };
    };

    //Get data
    getComplexData(data, store, dispatch) {
        let income = [];
        let expenses = [];
        data.data.map(val => {
            if (val.value.type.includes('income')) return income.push(val);
            else return expenses.push(val);
        });
        return dispatch(store.done(income, expenses));
    };

    getSimpleData(data) {
        console.log('work')
        const d = data
        return d;
    };
};