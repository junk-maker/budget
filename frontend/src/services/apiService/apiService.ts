import StorageService from '../storageService/storageService';
import {ApiData, ErrorPayload, ResponsePayload} from '../../interface/frontend.interface';

class ApiService {
    public url: string;
    public type: string;
    public data: ApiData;
    private StorageService = new StorageService();

    constructor(url: string, data: ApiData, type: string) {
        this.data = data;
        this.type = type;
        this.url = `/api/${url}`;
    };

    //Event handler
    async eventFetchHandler(headers: RequestInit): Promise<ErrorPayload | ResponsePayload>  {
        const response = await fetch(new Request(this.url, headers));
        if (response.status !== 200) {
            return (await response.json()) as ErrorPayload;
        };
            
        return (await response.json()) as ResponsePayload;
    };

    //REST
    async get(): Promise<ErrorPayload | ResponsePayload> {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type !== 'email-activation' ? `Bearer ${this.StorageService.getItem('authToken')}` : ''
            }
        };

        let data = await this.eventFetchHandler(headers);
        return data;
    };

    async put(): Promise<ErrorPayload | ResponsePayload> {
        const headers = {
            method: 'PUT',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'change-email' ||
                    this.type === 'change-password' ||  this.type === 'edit-item' ?
                    `Bearer ${this.StorageService.getItem('authToken')}` : ''
            }
        };

        let data = await this.eventFetchHandler(headers);
        return data;
    };

    async post(): Promise<ErrorPayload | ResponsePayload> {
        const headers = {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.type === 'add-item' || this.type === 'contact' ?
                    `Bearer ${this.StorageService.getItem('authToken')}` : ''
            }
        };

        let data = await this.eventFetchHandler(headers);
        return data;
    };

    async delete(): Promise<ErrorPayload | ResponsePayload> {
        const headers = {
            method: 'DELETE',
            body: this.type === 'delete-account' ? JSON.stringify(this.data) : null,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.StorageService.getItem('authToken')}`
            }
        };

        let data = await this.eventFetchHandler(headers);
        return data;
    };
};

export default ApiService;