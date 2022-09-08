import {useState, useEffect} from 'react';

let timeout: undefined | string;
const useValue = () => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        setValue('in');
        // timeout = setTimeout(() => setValue('in'), 0);
    }, []);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {value, setValue,};
};

export default useValue;