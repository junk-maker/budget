import {useState} from 'react';
import {UseCurrencyInterface, CurrencyStorageInterface} from './hooks.interface';

const useCurrency = (c: CurrencyStorageInterface): UseCurrencyInterface => {
    const [currency, setCurrency] = useState<null>(null);
    const [prevCurrency, setPrevCurrency] = useState<null>(null);
    const [currentCurrency, setCurrentCurrency] = useState<CurrencyStorageInterface>(c);

    return {
        currency,
        setCurrency,
        prevCurrency,
        setPrevCurrency,
        currentCurrency,
        setCurrentCurrency,
    };
};

export default useCurrency;