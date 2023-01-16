import {useState, useEffect} from 'react';
import {UseValueInyerface} from './hooks.interface';

let timeout: string | ReturnType<typeof setTimeout>;
const useValue = (): UseValueInyerface => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setValue('in'), 0);
    }, []);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {value, setValue,};
};

export default useValue;