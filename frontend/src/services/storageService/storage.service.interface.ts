export interface StorageServiceInterface {
    removeItem(key: string): void;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
};