import {useState, useEffect} from 'react';

let timeout: undefined | string;
const useRemove = () => {
    const [remove, setRemove] = useState<string>('');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        setRemove('in');
        // timeout = setTimeout(() => setRemove('in'), 0);
    },[setRemove]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {remove, setRemove,};
};

export default useRemove;