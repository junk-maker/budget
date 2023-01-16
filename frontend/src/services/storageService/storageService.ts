import {StorageServiceInterface} from './storage.service.interface';

class StorageService {
    private readonly storage: StorageServiceInterface;

    constructor() {
        this.storage = window.localStorage;
    };

    getItem(key: string): string | null {
        if(typeof this.storage.getItem !== 'function') {
            console.log('Storage should implement getItem method');
        };

        return this.storage.getItem(key);
    };

    removeItem(key: string): void  {
        if(typeof this.storage.removeItem !== 'function') {
            console.log('Storage should implement removeItem method');
        };

        this.storage.removeItem(key);
    };

    setItem(key: string, value: string): void  {
        if(typeof this.storage.setItem !== 'function') {
            console.log('Storage should implement setItem method');
        };

        this.storage.setItem(key, value);
    };
};

export default StorageService;