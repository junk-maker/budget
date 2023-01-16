import currencyStorage from '../../json-storage/currencyStorage.json';

export type CurrencyStorageInterface = typeof currencyStorage;

export interface FormatInterface {
    _id: string;
    amount: string;
    user_id: string;
    category: string;
    description: string;
    value: {id: string, type: string, translate: string, description: string};
    currency: {id: string, symbol: string, locales: string, currency: string, translate: string};
};