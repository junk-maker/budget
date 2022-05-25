import {useState, useEffect} from 'react';

let timeout;
const useValue = () => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setValue('in'), 0);
    },[]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {value, setValue};
};

export default useValue;