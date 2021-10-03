import {useState} from 'react';

const useCurrency= c => {
    const [currency, setCurrency] = useState(null);
    const [currentCurrency, setCurrentCurrency] = useState(c[0]);
    const [prevCurrency, setPrevCurrency] = useState(null);

    return {
        currency,
        setCurrency,
        prevCurrency,
        setPrevCurrency,
        currentCurrency,
        setCurrentCurrency
    };
};

export default useCurrency;