import {useState, useEffect} from 'react';
import {UseRemoveInterface} from './hooks.interface';

let timeout: ReturnType<typeof setTimeout>;
const useRemove = (): UseRemoveInterface => {
    const [remove, setRemove] = useState<string>('');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setRemove('in'), 0);
    },[setRemove]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {remove, setRemove,};
};

export default useRemove;