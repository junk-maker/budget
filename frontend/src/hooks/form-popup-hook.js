import {useState, useEffect} from 'react';

let timeout;
const useForm = () => {
    const [form, setForm] = useState(null);

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setForm('in'), 0);
    },[]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {form, setForm,};
};

export default useForm;