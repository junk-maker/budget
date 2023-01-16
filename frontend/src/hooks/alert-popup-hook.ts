import {useState, useEffect} from 'react';

let timeout: string | ReturnType<typeof setTimeout>;
const useAlert = (): string => {
    const [alert, setAlert] = useState<string>('alert');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setAlert('alert active'), 300);
    },[setAlert]);

    useEffect(() => {
        if(alert) {timeout = setTimeout(() => setAlert('alert'), 3000);}
    },[alert, setAlert]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout)};
    }, []);

    return alert;
}

export default useAlert;