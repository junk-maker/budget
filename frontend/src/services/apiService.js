import StorageService from './storageService';

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
                Authorization: this.type === 'add-item' || this.type === 'contact' ?
                    `Bearer ${this.storage.getItem('authToken')}` : null
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        return data;
    };

    async delete() {
        const headers = {
            method: 'DELETE',
            body: this.type === 'delete-account' ? JSON.stringify(this.data) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.storage.getItem('authToken')}`
            }
        };

        let data = await this.eventFetchHandler(headers, 'Try again later:');
        return data;
    };
};