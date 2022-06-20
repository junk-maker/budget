export default class StorageService {
    constructor(storage) {
        this.storage = storage;
    };

    getItem(key) {
        if(typeof this.storage.getItem !== 'function') {
            console.log('Storage should implement getItem method');
        };

        return this.storage.getItem(key);
    };

    removeItem(key) {
        if(typeof this.storage.removeItem !== 'function') {
            console.log('Storage should implement removeItem method');
        };

        this.storage.removeItem(key);
    };

    setItem(key, value) {
        if(typeof this.storage.setItem !== 'function') {
            console.log('Storage should implement setItem method');
        };

        this.storage.setItem(key, value);
    };
};