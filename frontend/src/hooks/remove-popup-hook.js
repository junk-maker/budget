import {useState, useEffect} from 'react';

let timeout;
const useRemove = () => {
    const [remove, setRemove] = useState(null);

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